"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils/slugify";

export async function getForumCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_categories")
    .select("*")
    .order("sort_order");

  if (error) throw error;

  // Get post counts per category
  const { data: posts } = await supabase
    .from("forum_posts")
    .select("category_id")
    .eq("status", "published");

  const counts: Record<string, number> = {};
  posts?.forEach((p) => {
    counts[p.category_id] = (counts[p.category_id] || 0) + 1;
  });

  return data.map((cat) => ({ ...cat, post_count: counts[cat.id] || 0 }));
}

export async function getForumCategory(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getCategoryPosts(categoryId: string, page = 1, limit = 20) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("forum_posts")
    .select("*, profiles!forum_posts_author_id_fkey(id, display_name, email, avatar_url)", {
      count: "exact",
    })
    .eq("category_id", categoryId)
    .eq("status", "published")
    .order("is_pinned", { ascending: false })
    .order("last_activity_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { posts: data || [], total: count || 0 };
}

export async function getRecentPosts(limit = 10) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_posts")
    .select(
      "*, profiles!forum_posts_author_id_fkey(id, display_name, email, avatar_url), forum_categories(name, slug, color)"
    )
    .eq("status", "published")
    .order("last_activity_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getForumPost(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_posts")
    .select(
      "*, profiles!forum_posts_author_id_fkey(id, display_name, email, avatar_url), forum_categories(name, slug, color)"
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getPostComments(postId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_comments")
    .select("*, profiles!forum_comments_author_id_fkey(id, display_name, email, avatar_url)")
    .eq("post_id", postId)
    .eq("is_removed", false)
    .order("created_at");

  if (error) throw error;
  return data || [];
}

export async function getPostReactions(postId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_reactions")
    .select("*")
    .eq("post_id", postId);

  if (error) throw error;
  return data || [];
}

export async function createForumPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!title || !body || !categoryId) {
    return { error: "Title, body, and category are required" };
  }

  const slug = slugify(title) + "-" + Date.now().toString(36);

  const { data, error } = await supabase
    .from("forum_posts")
    .insert({
      title,
      slug,
      body,
      category_id: categoryId,
      author_id: user.id,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/forum");
  return { success: true, post: data };
}

export async function createComment(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const postId = formData.get("postId") as string;
  const body = formData.get("body") as string;
  const parentId = (formData.get("parentId") as string) || null;

  if (!postId || !body) {
    return { error: "Post and comment body are required" };
  }

  const { error } = await supabase.from("forum_comments").insert({
    post_id: postId,
    author_id: user.id,
    parent_id: parentId,
    body,
  });

  if (error) return { error: error.message };

  // Update last_activity_at
  await supabase
    .from("forum_posts")
    .update({ last_activity_at: new Date().toISOString() })
    .eq("id", postId);

  revalidatePath(`/forum/post/${postId}`);
  return { success: true };
}
