"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAll } from "@/lib/supabase/fetch-all";
import { revalidatePath } from "next/cache";
import { getResend, FROM_EMAIL, SITE_URL } from "@/lib/email";
import { InviteEmail } from "@/components/email/invite-email";
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
  await requireAdmin();
  const adminClient = createAdminClient();

  const [families, members, posts, allowlist, lastSync] = await Promise.all([
    adminClient.from("families").select("id", { count: "exact", head: true }),
    adminClient.from("members").select("id", { count: "exact", head: true }),
    adminClient.from("forum_posts").select("id", { count: "exact", head: true }),
    adminClient.from("auth_allowlist").select("email, claimed_at, invite_sent_at", { count: "exact" }),
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
  const invitedCount =
    allowlist.data?.filter((a) => a.invite_sent_at !== null).length || 0;

  return {
    familyCount: families.count || 0,
    memberCount: members.count || 0,
    postCount: posts.count || 0,
    allowlistCount: allowlist.count || 0,
    claimedCount,
    invitedCount,
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

  // Fetch all members with non-null emails (members & regular attenders only)
  const members = await fetchAll(adminClient, "members", {
    select: "email",
    modify: (q) => q.not("email", "is", null).in("member_status", ["member", "regular_attender"]),
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

export async function getInviteStats() {
  await requireAdmin();
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("auth_allowlist")
    .select("email, claimed_at, invite_sent_at");

  if (error) throw error;
  const entries = data || [];

  return {
    total: entries.length,
    invited: entries.filter((e) => e.invite_sent_at).length,
    notInvited: entries.filter((e) => !e.invite_sent_at && !e.claimed_at).length,
    claimed: entries.filter((e) => e.claimed_at).length,
  };
}

export async function sendInviteEmails(batchSize: number) {
  await requireAdmin();
  const adminClient = createAdminClient();

  const cap = Math.min(batchSize, 100);

  // Fetch unsent, unclaimed allowlist entries
  const { data: unsent, error: fetchErr } = await adminClient
    .from("auth_allowlist")
    .select("email")
    .is("invite_sent_at", null)
    .is("claimed_at", null)
    .order("created_at", { ascending: true })
    .limit(cap);

  if (fetchErr) return { error: fetchErr.message };
  if (!unsent || unsent.length === 0) return { sent: 0, errors: [] };

  // Look up first names from members table
  const emails = unsent.map((u) => u.email.toLowerCase());
  const { data: memberData } = await adminClient
    .from("members")
    .select("email, first_name")
    .in("email", emails);

  const nameMap = new Map(
    (memberData || []).map((m: any) => [m.email.toLowerCase(), m.first_name])
  );

  let sent = 0;
  const errors: string[] = [];
  const loginUrl = `${SITE_URL}/login`;

  for (const entry of unsent) {
    const email = entry.email.toLowerCase();
    const firstName = nameMap.get(email) || "Friend";

    // Create passwordless account (skip if already exists)
    const { error: createErr } = await adminClient.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (createErr && !createErr.message.includes("already been registered")) {
      errors.push(`${email}: ${createErr.message}`);
      continue;
    }

    try {
      const { error: sendErr } = await getResend().emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're invited to the Redeemer Church Directory",
        react: InviteEmail({ firstName, email, loginUrl }),
      });

      if (sendErr) {
        errors.push(`${email}: ${sendErr.message}`);
        continue;
      }

      // Mark as sent
      const { error: updateErr } = await adminClient
        .from("auth_allowlist")
        .update({ invite_sent_at: new Date().toISOString() })
        .eq("email", entry.email);

      if (updateErr) {
        errors.push(`${email}: sent but failed to mark as sent`);
      }

      sent++;
    } catch (e: any) {
      errors.push(`${email}: ${e.message}`);
    }
  }

  revalidatePath("/admin/invites");
  revalidatePath("/admin/allowlist");

  return { sent, errors };
}
