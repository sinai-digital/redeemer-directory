"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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

  const [families, members, posts, allowlist] = await Promise.all([
    adminClient.from("families").select("id", { count: "exact", head: true }),
    adminClient.from("members").select("id", { count: "exact", head: true }),
    adminClient.from("forum_posts").select("id", { count: "exact", head: true }),
    adminClient.from("auth_allowlist").select("email, claimed_at", { count: "exact" }),
  ]);

  const claimedCount =
    allowlist.data?.filter((a) => a.claimed_at !== null).length || 0;

  return {
    familyCount: families.count || 0,
    memberCount: members.count || 0,
    postCount: posts.count || 0,
    allowlistCount: allowlist.count || 0,
    claimedCount,
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
  await requireAdmin();
  const adminClient = createAdminClient();

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
