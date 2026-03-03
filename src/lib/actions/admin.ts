"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAll } from "@/lib/supabase/fetch-all";
import { revalidatePath } from "next/cache";
import type { UserRole } from "@/lib/types";

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

export async function getAdminStats() {
  const adminClient = createAdminClient();

  const [families, members, posts, allowlist, lastSync] = await Promise.all([
    adminClient.from("families").select("id", { count: "exact", head: true }),
    adminClient.from("members").select("id", { count: "exact", head: true }),
    adminClient.from("forum_posts").select("id", { count: "exact", head: true }),
    adminClient.from("auth_allowlist").select("email, claimed_at", { count: "exact" }),
    adminClient
      .from("sync_history")
      .select("performed_at")
      .is("rolled_back_at", null)
      .order("performed_at", { ascending: false })
      .limit(1)
      .single(),
  ]);

  const claimedCount =
    allowlist.data?.filter((a) => a.claimed_at !== null).length || 0;

  return {
    familyCount: families.count || 0,
    memberCount: members.count || 0,
    postCount: posts.count || 0,
    allowlistCount: allowlist.count || 0,
    claimedCount,
    lastSyncAt: lastSync.data?.performed_at ?? null,
  };
}

export async function getAllowlist() {
  await requireAdmin();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("auth_allowlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addToAllowlist(formData: FormData) {
  const user = await requireAdmin();
  const adminClient = createAdminClient();

  const email = (formData.get("email") as string)?.toLowerCase();
  if (!email) return { error: "Email is required" };

  const { error } = await adminClient.from("auth_allowlist").insert({
    email,
    invited_by: user.id,
  });

  if (error) {
    if (error.code === "23505") return { error: "Email already on allowlist" };
    return { error: error.message };
  }

  revalidatePath("/admin/allowlist");
  return { success: true };
}

export async function removeFromAllowlist(email: string) {
  await requireAdmin();
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("auth_allowlist")
    .delete()
    .eq("email", email);

  if (error) return { error: error.message };

  revalidatePath("/admin/allowlist");
  return { success: true };
}

export async function updateMemberRole(profileId: string, role: UserRole) {
  const user = await requireAdmin();
  const adminClient = createAdminClient();

  // Prevent super_admin from demoting themselves
  if (profileId === user.id && role !== "super_admin") {
    const { data: profile } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", profileId)
      .single();

    if (profile?.role === "super_admin") {
      return { error: "Super admins cannot demote themselves" };
    }
  }

  const { error } = await adminClient
    .from("profiles")
    .update({ role })
    .eq("id", profileId);

  if (error) return { error: error.message };

  revalidatePath("/admin/members");
  return { success: true };
}

export async function togglePostPin(postId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("forum_posts")
    .select("is_pinned")
    .eq("id", postId)
    .single();

  if (!post) return { error: "Post not found" };

  const { error } = await supabase
    .from("forum_posts")
    .update({ is_pinned: !post.is_pinned })
    .eq("id", postId);

  if (error) return { error: error.message };

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { success: true };
}

export async function togglePostLock(postId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("forum_posts")
    .select("is_locked")
    .eq("id", postId)
    .single();

  if (!post) return { error: "Post not found" };

  const { error } = await supabase
    .from("forum_posts")
    .update({ is_locked: !post.is_locked })
    .eq("id", postId);

  if (error) return { error: error.message };

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { success: true };
}

export async function removePost(postId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("forum_posts")
    .update({ status: "removed" })
    .eq("id", postId);

  if (error) return { error: error.message };

  revalidatePath("/admin/forum");
  revalidatePath("/forum");
  return { success: true };
}

export async function syncAllowlistFromDirectory() {
  const user = await requireAdmin();
  const adminClient = createAdminClient();

  // Fetch all members with non-null emails
  const members = await fetchAll(adminClient, "members", {
    select: "email",
    modify: (q) => q.not("email", "is", null),
  });

  // Deduplicate and lowercase
  const memberEmails = [...new Set(
    members.map((m: { email: string }) => m.email.toLowerCase())
  )];

  // Get current allowlist emails
  const { data: existing } = await adminClient
    .from("auth_allowlist")
    .select("email");

  const existingSet = new Set(
    (existing || []).map((a: { email: string }) => a.email.toLowerCase())
  );

  // Filter to only new emails
  const newEmails = memberEmails.filter((e) => !existingSet.has(e));

  if (newEmails.length === 0) {
    return { added: 0, skipped: memberEmails.length };
  }

  // Batch insert in chunks of 100
  for (let i = 0; i < newEmails.length; i += 100) {
    const chunk = newEmails.slice(i, i + 100).map((email) => ({
      email,
      invited_by: user.id,
    }));

    const { error } = await adminClient.from("auth_allowlist").insert(chunk);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/allowlist");
  return { added: newEmails.length, skipped: memberEmails.length - newEmails.length };
}

export async function bulkCreateAccounts(defaultPassword: string) {
  await requireAdmin();
  const adminClient = createAdminClient();

  if (!defaultPassword || defaultPassword.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  // Fetch all members with non-null emails
  const members = await fetchAll(adminClient, "members", {
    select: "id, email, first_name, last_name",
    modify: (q) => q.not("email", "is", null),
  });

  // Deduplicate by email (lowercase)
  const seen = new Set<string>();
  const uniqueMembers = members.filter((m: any) => {
    const email = m.email.toLowerCase();
    if (seen.has(email)) return false;
    seen.add(email);
    return true;
  });

  // Get existing auth users to skip
  const { data: existingProfiles } = await adminClient
    .from("profiles")
    .select("email");

  const existingEmails = new Set(
    (existingProfiles || []).map((p: any) => p.email.toLowerCase())
  );

  const toCreate = uniqueMembers.filter(
    (m: any) => !existingEmails.has(m.email.toLowerCase())
  );

  if (toCreate.length === 0) {
    return { created: 0, skipped: uniqueMembers.length, errors: [] };
  }

  let created = 0;
  const errors: string[] = [];

  for (const member of toCreate as any[]) {
    const { error } = await adminClient.auth.admin.createUser({
      email: member.email.toLowerCase(),
      password: defaultPassword,
      email_confirm: true,
      user_metadata: {
        display_name: `${member.first_name} ${member.last_name}`.trim(),
      },
    });

    if (error) {
      // Skip duplicates silently, report other errors
      if (!error.message.includes("already been registered")) {
        errors.push(`${member.email}: ${error.message}`);
      }
    } else {
      created++;

      // Link the member to their new profile via email match
      const { data: profile } = await adminClient
        .from("profiles")
        .select("id")
        .eq("email", member.email.toLowerCase())
        .single();

      if (profile) {
        await adminClient
          .from("members")
          .update({ profile_id: profile.id })
          .eq("id", member.id);
      }
    }
  }

  // Also ensure all these emails are on the allowlist
  const { data: existingAllowlist } = await adminClient
    .from("auth_allowlist")
    .select("email");

  const allowlistEmails = new Set(
    (existingAllowlist || []).map((a: any) => a.email.toLowerCase())
  );

  const newAllowlistEmails = uniqueMembers
    .map((m: any) => m.email.toLowerCase())
    .filter((e: string) => !allowlistEmails.has(e));

  if (newAllowlistEmails.length > 0) {
    for (let i = 0; i < newAllowlistEmails.length; i += 100) {
      const chunk = newAllowlistEmails.slice(i, i + 100).map((email: string) => ({
        email,
      }));
      await adminClient.from("auth_allowlist").insert(chunk);
    }
  }

  revalidatePath("/admin/allowlist");
  revalidatePath("/admin/members");

  return {
    created,
    skipped: uniqueMembers.length - toCreate.length,
    errors,
  };
}
