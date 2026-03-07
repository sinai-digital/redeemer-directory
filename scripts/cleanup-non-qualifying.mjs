#!/usr/bin/env node

/**
 * One-time cleanup: remove directory entries for people who are NOT
 * members or regular attenders (and have no linked profile/account).
 *
 * Usage: node scripts/cleanup-non-qualifying.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";

process.loadEnvFile(".env.local");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const QUALIFYING = ["member", "regular_attender"];

// Supabase caps at 1000 rows — paginate to get all
async function fetchAll(table, select, filter) {
  let all = [], offset = 0;
  while (true) {
    let q = sb.from(table).select(select).range(offset, offset + 999);
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`Fetch error: ${error.message}`);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < 1000) break;
    offset += 1000;
  }
  return all;
}

async function main() {
  // 1. Fetch ALL members without a linked profile, then filter in JS
  //    (avoids the SQL NULL issue with NOT IN)
  const unlinked = await fetchAll(
    "members",
    "id, first_name, last_name, email, member_status, family_id",
    (q) => q.is("profile_id", null)
  );

  const toRemove = unlinked.filter(
    (m) => !m.member_status || !QUALIFYING.includes(m.member_status)
  );

  if (toRemove.length === 0) {
    console.log("No non-qualifying members to remove.");
    return;
  }

  console.log(`Found ${toRemove.length} non-qualifying member(s) to remove:`);
  const statusCounts = {};
  for (const m of toRemove) {
    const s = m.member_status || "NULL";
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  }
  console.log("  By status:", statusCounts);

  // Show a sample (first 10)
  for (const m of toRemove.slice(0, 10)) {
    console.log(`  - ${m.first_name} ${m.last_name} (${m.member_status || "no status"}) [${m.email || "no email"}]`);
  }
  if (toRemove.length > 10) {
    console.log(`  ...and ${toRemove.length - 10} more`);
  }

  // 2. Collect emails for allowlist cleanup
  const emails = toRemove
    .map((m) => m.email?.toLowerCase())
    .filter(Boolean);

  // 3. Delete the member records (in batches of 500 to avoid URL length limits)
  const memberIds = toRemove.map((m) => m.id);
  for (let i = 0; i < memberIds.length; i += 500) {
    const batch = memberIds.slice(i, i + 500);
    const { error: delErr } = await sb
      .from("members")
      .delete()
      .in("id", batch);
    if (delErr) {
      console.error("Error deleting members:", delErr.message);
      process.exit(1);
    }
  }
  console.log(`Deleted ${memberIds.length} member record(s).`);

  // 4. Delete orphaned families (families with no remaining members)
  const familyIds = [...new Set(toRemove.map((m) => m.family_id).filter(Boolean))];
  if (familyIds.length > 0) {
    const occupied = await fetchAll(
      "members",
      "family_id",
      (q) => q.in("family_id", familyIds)
    );
    const occupiedIds = new Set(occupied.map((r) => r.family_id));
    const orphanedIds = familyIds.filter((id) => !occupiedIds.has(id));

    if (orphanedIds.length > 0) {
      for (let i = 0; i < orphanedIds.length; i += 500) {
        const batch = orphanedIds.slice(i, i + 500);
        const { error: famErr } = await sb
          .from("families")
          .delete()
          .in("id", batch);
        if (famErr) {
          console.error("Error deleting orphaned families:", famErr.message);
        }
      }
      console.log(`Deleted ${orphanedIds.length} orphaned family record(s).`);
    } else {
      console.log("No orphaned families to delete.");
    }
  }

  // 5. Remove allowlist entries for those emails
  if (emails.length > 0) {
    let removedCount = 0;
    for (let i = 0; i < emails.length; i += 500) {
      const batch = emails.slice(i, i + 500);
      const { data: removed, error: alErr } = await sb
        .from("auth_allowlist")
        .delete()
        .in("email", batch)
        .is("claimed_at", null)
        .select("email");
      if (alErr) {
        console.error("Error cleaning allowlist:", alErr.message);
      } else {
        removedCount += removed?.length || 0;
      }
    }
    console.log(`Removed ${removedCount} allowlist entry/entries.`);
  }

  // Final count
  const { count } = await sb
    .from("members")
    .select("id", { count: "exact", head: true });
  console.log(`\nCleanup complete. ${count} members remain in the directory.`);
}

main().catch(console.error);
