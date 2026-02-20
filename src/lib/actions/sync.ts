"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { fetchAll } from "@/lib/supabase/fetch-all";
import type {
  SubsplashPerson,
  SyncPreview,
  SyncPreviewMemberChange,
  SyncPreviewFamilyChange,
  SyncHistoryEntry,
  MemberStatus,
  FamilyRole,
} from "@/lib/types";

// ============================================================
// Helpers
// ============================================================

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    throw new Error("Not authorized");
  }
  return user;
}

function mapMembershipStatus(raw: string): MemberStatus | null {
  const normalized = raw.toLowerCase().trim();
  const map: Record<string, MemberStatus> = {
    member: "member",
    visitor: "visitor",
    regular_attender: "regular_attender",
    "regular attender": "regular_attender",
    newcomer: "newcomer",
  };
  return map[normalized] ?? null;
}

function mapHouseholdRole(raw: string): FamilyRole | null {
  const normalized = raw.toLowerCase().trim();
  if (normalized === "child") return "child";
  if (normalized === "adult" || normalized === "parent" || normalized === "head" || normalized === "spouse") return "parent";
  // "unknown" and empty → null (will be treated as parent for name derivation)
  return null;
}

function mapGender(raw: string): "male" | "female" | null {
  const normalized = raw.toLowerCase().trim();
  if (normalized === "male") return "male";
  if (normalized === "female") return "female";
  return null;
}

function deriveFamilyName(members: SubsplashPerson[]): string {
  // Collect last names of non-child members
  const adultLastNames = new Set(
    members
      .filter((m) => m.household_role?.toLowerCase() !== "child")
      .map((m) => m.last_name.trim())
      .filter(Boolean)
  );

  // If no adults, fall back to all members
  if (adultLastNames.size === 0) {
    members.forEach((m) => {
      if (m.last_name.trim()) adultLastNames.add(m.last_name.trim());
    });
  }

  const names = [...adultLastNames].sort();
  if (names.length === 0) return "Unknown Family";
  if (names.length === 1) return `The ${names[0]} Family`;
  return `The ${names.join(" & ")} Family`;
}

function parseDate(raw: string): string | null {
  if (!raw || !raw.trim()) return null;
  // Try to parse and return ISO date string
  const d = new Date(raw.trim());
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

function parseYear(raw: string): number | null {
  if (!raw || !raw.trim()) return null;
  const n = parseInt(raw.trim(), 10);
  return isNaN(n) ? null : n;
}

// ============================================================
// previewSync
// ============================================================

export async function previewSync(
  rows: SubsplashPerson[],
  filename: string
): Promise<SyncPreview> {
  await requireAdmin();
  const admin = createAdminClient();

  // Fetch current state (paginated — Supabase caps at 1000 rows per request)
  const [currentMembers, currentFamilies] = await Promise.all([
    fetchAll(admin, "members"),
    fetchAll(admin, "families"),
  ]);

  const existingMembersBySubsplash = new Map(
    currentMembers
      .filter((m: any) => m.subsplash_person_id)
      .map((m: any) => [m.subsplash_person_id, m])
  );

  const existingFamiliesBySubsplash = new Map(
    currentFamilies
      .filter((f: any) => f.subsplash_household_id)
      .map((f: any) => [f.subsplash_household_id, f])
  );

  // Group CSV rows by household
  const householdGroups = new Map<string, SubsplashPerson[]>();
  const noHousehold: SubsplashPerson[] = [];
  for (const row of rows) {
    if (row.household_id) {
      const group = householdGroups.get(row.household_id) || [];
      group.push(row);
      householdGroups.set(row.household_id, group);
    } else {
      noHousehold.push(row);
    }
  }

  // Preview families
  const csvHouseholdIds = new Set(householdGroups.keys());
  const familyChanges: SyncPreview["families"] = { added: [], updated: [], removed: [], unchanged: [] };

  for (const [householdId, members] of householdGroups) {
    const existing = existingFamiliesBySubsplash.get(householdId);
    const name = deriveFamilyName(members);
    if (!existing) {
      familyChanges.added.push({ household_id: householdId, family_name: name, type: "added" });
    } else {
      // Check if family name changed
      if (existing.display_name !== name) {
        familyChanges.updated.push({ household_id: householdId, family_name: name, type: "updated" });
      } else {
        familyChanges.unchanged.push({ household_id: householdId, family_name: name, type: "unchanged" });
      }
    }
  }

  // Families in DB but not in CSV
  for (const [householdId, family] of existingFamiliesBySubsplash) {
    if (!csvHouseholdIds.has(householdId)) {
      familyChanges.removed.push({
        household_id: householdId,
        family_name: family.display_name,
        type: "removed",
      });
    }
  }

  // Preview members
  const csvPersonIds = new Set(rows.map((r) => r.person_id));
  const memberChanges: SyncPreview["members"] = { added: [], updated: [], removed: [], unchanged: [] };

  for (const row of rows) {
    const existing = existingMembersBySubsplash.get(row.person_id);
    if (!existing) {
      memberChanges.added.push({
        person_id: row.person_id,
        first_name: row.first_name,
        last_name: row.last_name,
        type: "added",
        has_profile: false,
      });
    } else {
      // Check for changes
      const changes: string[] = [];
      if (existing.first_name !== row.first_name) changes.push("first_name");
      if (existing.last_name !== row.last_name) changes.push("last_name");
      if ((existing.email ?? "") !== (row.email ?? "")) changes.push("email");
      if ((existing.phone ?? "") !== (row.phone ?? "")) changes.push("phone");
      if (mapGender(row.gender) !== existing.gender) changes.push("gender");
      if (mapMembershipStatus(row.membership_status) !== existing.member_status) changes.push("member_status");

      if (changes.length > 0) {
        memberChanges.updated.push({
          person_id: row.person_id,
          first_name: row.first_name,
          last_name: row.last_name,
          type: "updated",
          has_profile: !!existing.profile_id,
          changes,
        });
      } else {
        memberChanges.unchanged.push({
          person_id: row.person_id,
          first_name: row.first_name,
          last_name: row.last_name,
          type: "unchanged",
          has_profile: !!existing.profile_id,
        });
      }
    }
  }

  // Members in DB but not in CSV (only those with subsplash_person_id)
  for (const [personId, member] of existingMembersBySubsplash) {
    if (!csvPersonIds.has(personId)) {
      memberChanges.removed.push({
        person_id: personId,
        first_name: member.first_name,
        last_name: member.last_name,
        type: "removed",
        has_profile: !!member.profile_id,
      });
    }
  }

  return { members: memberChanges, families: familyChanges };
}

// ============================================================
// Batching helper
// ============================================================

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const BATCH_SIZE = 100;

// ============================================================
// executeSync
// ============================================================

export async function executeSync(
  rows: SubsplashPerson[],
  filename: string
): Promise<{ success: boolean; summary: SyncHistoryEntry["summary"] }> {
  const user = await requireAdmin();
  const admin = createAdminClient();

  // 1. Snapshot current state (paginated — Supabase caps at 1000 rows per request)
  const [currentMembers, currentFamilies] = await Promise.all([
    fetchAll(admin, "members"),
    fetchAll(admin, "families"),
  ]);

  const snapshot = {
    members: currentMembers,
    families: currentFamilies,
  };

  // 2. Group CSV rows by household_id
  const householdGroups = new Map<string, SubsplashPerson[]>();
  for (const row of rows) {
    if (row.household_id) {
      const group = householdGroups.get(row.household_id) || [];
      group.push(row);
      householdGroups.set(row.household_id, group);
    }
  }

  // Build lookups
  const existingFamiliesBySubsplash = new Map(
    currentFamilies
      .filter((f: any) => f.subsplash_household_id)
      .map((f: any) => [f.subsplash_household_id, f])
  );

  const existingMembersBySubsplash = new Map(
    currentMembers
      .filter((m: any) => m.subsplash_person_id)
      .map((m: any) => [m.subsplash_person_id, m])
  );

  // 3. Batch upsert families
  const familyIdMap = new Map<string, string>();
  const newFamilies: any[] = [];
  const existingFamilyUpdates: any[] = [];
  let familiesAdded = 0;
  let familiesUpdated = 0;

  for (const [householdId, members] of householdGroups) {
    const name = deriveFamilyName(members);
    const addrSource = members.find((m) => m.household_street) || members[0];
    const familyName = name.replace(/^The\s+/, "").replace(/\s+Family$/, "");
    const existing = existingFamiliesBySubsplash.get(householdId);

    const familyData = {
      family_name: familyName,
      display_name: name,
      address: addrSource.household_street || null,
      city: addrSource.household_city || null,
      state: addrSource.household_state || null,
      zip: addrSource.household_postal_code || null,
      subsplash_household_id: householdId,
    };

    if (existing) {
      familyIdMap.set(householdId, existing.id);
      existingFamilyUpdates.push({ id: existing.id, ...familyData });
      if (
        existing.display_name !== name ||
        existing.address !== (addrSource.household_street || null) ||
        existing.city !== (addrSource.household_city || null)
      ) {
        familiesUpdated++;
      }
    } else {
      newFamilies.push(familyData);
    }
  }

  // Batch insert new families
  for (const batch of chunk(newFamilies, BATCH_SIZE)) {
    const { data, error } = await admin
      .from("families")
      .insert(batch)
      .select("id, subsplash_household_id");

    if (error) throw new Error(`Failed to insert families: ${error.message}`);
    for (const row of data ?? []) {
      familyIdMap.set(row.subsplash_household_id, row.id);
    }
  }
  familiesAdded = newFamilies.length;

  // Batch update existing families (upsert on PK)
  for (const batch of chunk(existingFamilyUpdates, BATCH_SIZE)) {
    const { error } = await admin
      .from("families")
      .upsert(batch, { onConflict: "id" });

    if (error) throw new Error(`Failed to update families: ${error.message}`);
  }

  // 4. Batch upsert members
  const newMemberRows: any[] = [];
  const existingMemberRows: any[] = [];
  const csvPersonIds = new Set<string>();

  for (const row of rows) {
    csvPersonIds.add(row.person_id);
    const existing = existingMembersBySubsplash.get(row.person_id);
    const familyId = row.household_id ? familyIdMap.get(row.household_id) ?? null : null;

    const memberData = {
      first_name: row.first_name.trim(),
      last_name: row.last_name.trim(),
      email: row.email || null,
      phone: row.phone || null,
      birthday: parseDate(row.date_of_birth),
      gender: mapGender(row.gender),
      member_status: mapMembershipStatus(row.membership_status),
      family_id: familyId,
      family_role: mapHouseholdRole(row.household_role),
      address: row.street || null,
      city: row.city || null,
      state: row.state || null,
      zip: row.postal_code || null,
      marital_status: row.marital_status || null,
      membership_status_date: parseDate(row.membership_status_date),
      baptism_date: parseDate(row.baptism_date),
      allergy_notes: row.allergy_notes || null,
      care_notes: row.care_notes || null,
      grade_level: row.grade_level || null,
      graduation_year: parseYear(row.graduation_year),
      subsplash_person_id: row.person_id,
    };

    if (existing) {
      // Include the existing id so upsert matches on PK; exclude show_* and profile_id
      existingMemberRows.push({ id: existing.id, ...memberData });
    } else {
      newMemberRows.push({
        ...memberData,
        show_email: true,
        show_phone: true,
        show_birthday: true,
        show_address: true,
      });
    }
  }

  // Batch insert new members
  for (const batch of chunk(newMemberRows, BATCH_SIZE)) {
    const { error } = await admin.from("members").insert(batch);
    if (error) throw new Error(`Failed to insert members: ${error.message}`);
  }

  // Batch update existing members (upsert on PK, preserves show_* and profile_id)
  for (const batch of chunk(existingMemberRows, BATCH_SIZE)) {
    const { error } = await admin
      .from("members")
      .upsert(batch, { onConflict: "id" });
    if (error) throw new Error(`Failed to update members: ${error.message}`);
  }

  // 5. Batch delete stale members (only if no profile linked)
  const staleMemberIds = currentMembers
    .filter((m: any) => m.subsplash_person_id && !csvPersonIds.has(m.subsplash_person_id) && !m.profile_id)
    .map((m: any) => m.id);

  if (staleMemberIds.length > 0) {
    const { error } = await admin.from("members").delete().in("id", staleMemberIds);
    if (error) throw new Error(`Failed to delete stale members: ${error.message}`);
  }

  // 6. Batch delete orphaned families
  const csvHouseholdIds = new Set(householdGroups.keys());
  const staleFamilyIds = currentFamilies
    .filter((f: any) => f.subsplash_household_id && !csvHouseholdIds.has(f.subsplash_household_id))
    .map((f: any) => f.id);

  if (staleFamilyIds.length > 0) {
    // Get family IDs that still have members
    const { data: occupiedFamilies } = await admin
      .from("members")
      .select("family_id")
      .in("family_id", staleFamilyIds);

    const occupiedIds = new Set((occupiedFamilies ?? []).map((r: any) => r.family_id));
    const emptyFamilyIds = staleFamilyIds.filter((id: string) => !occupiedIds.has(id));

    if (emptyFamilyIds.length > 0) {
      await admin.from("families").delete().in("id", emptyFamilyIds);
    }
  }

  const summary = {
    members_added: newMemberRows.length,
    members_updated: existingMemberRows.length,
    members_removed: staleMemberIds.length,
    families_added: familiesAdded,
    families_updated: familiesUpdated,
    families_removed: staleFamilyIds.length,
  };

  // 7. Save sync history
  const { error: historyError } = await admin.from("sync_history").insert({
    performed_by: user.id,
    csv_filename: filename,
    csv_row_count: rows.length,
    summary,
    snapshot_before: snapshot,
  });

  if (historyError) {
    console.error("Failed to save sync history:", historyError);
  }

  // 8. Prune old history (keep 3 most recent)
  const { data: allHistory } = await admin
    .from("sync_history")
    .select("id")
    .order("performed_at", { ascending: false });

  if (allHistory && allHistory.length > 3) {
    const toDelete = allHistory.slice(3).map((h: any) => h.id);
    await admin.from("sync_history").delete().in("id", toDelete);
  }

  // 9. Revalidate
  revalidatePath("/directory");
  revalidatePath("/admin");
  revalidatePath("/admin/members");
  revalidatePath("/admin/sync");

  return { success: true, summary };
}

// ============================================================
// getSyncHistory
// ============================================================

export async function getSyncHistory(): Promise<SyncHistoryEntry[]> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("sync_history")
    .select("id, performed_by, performed_at, csv_filename, csv_row_count, summary, rolled_back_at, created_at")
    .order("performed_at", { ascending: false })
    .limit(3);

  if (error) throw error;
  if (!data) return [];

  // Fetch performer profiles
  const performerIds = [...new Set(data.map((h: any) => h.performed_by).filter(Boolean))];
  let profiles: any[] = [];
  if (performerIds.length > 0) {
    const { data: profileData } = await admin
      .from("profiles")
      .select("*")
      .in("id", performerIds);
    profiles = profileData ?? [];
  }

  const profileMap = new Map(profiles.map((p: any) => [p.id, p]));

  return data.map((h: any) => ({
    ...h,
    performer: h.performed_by ? profileMap.get(h.performed_by) : undefined,
  }));
}

// ============================================================
// rollbackSync
// ============================================================

export async function rollbackSync(historyId: string): Promise<{ success: boolean }> {
  await requireAdmin();
  const admin = createAdminClient();

  // Load the history entry with snapshot
  const { data: entry, error: fetchError } = await admin
    .from("sync_history")
    .select("*")
    .eq("id", historyId)
    .single();

  if (fetchError || !entry) throw new Error("Sync history entry not found");
  if (entry.rolled_back_at) throw new Error("This sync has already been rolled back");

  const snapshot = entry.snapshot_before as { members: any[]; families: any[] };

  // Delete all members with subsplash_person_id (synced members only)
  await admin
    .from("members")
    .delete()
    .not("subsplash_person_id", "is", null);

  // Delete all families with subsplash_household_id (synced families only)
  await admin
    .from("families")
    .delete()
    .not("subsplash_household_id", "is", null);

  // Re-insert families from snapshot (batched)
  const snapshotFamilies = (snapshot.families ?? [])
    .filter((f: any) => f.subsplash_household_id)
    .map(({ sort_name, ...rest }: any) => rest);

  for (const batch of chunk(snapshotFamilies, BATCH_SIZE)) {
    const { error } = await admin.from("families").insert(batch);
    if (error) throw new Error(`Failed to restore families: ${error.message}`);
  }

  // Re-insert members from snapshot (batched)
  const snapshotMembers = (snapshot.members ?? [])
    .filter((m: any) => m.subsplash_person_id)
    .map(({ sort_name, ...rest }: any) => rest);

  for (const batch of chunk(snapshotMembers, BATCH_SIZE)) {
    const { error } = await admin.from("members").insert(batch);
    if (error) throw new Error(`Failed to restore members: ${error.message}`);
  }

  // Mark as rolled back
  await admin
    .from("sync_history")
    .update({ rolled_back_at: new Date().toISOString() })
    .eq("id", historyId);

  revalidatePath("/directory");
  revalidatePath("/admin");
  revalidatePath("/admin/members");
  revalidatePath("/admin/sync");

  return { success: true };
}
