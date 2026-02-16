"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleReaction(
  postId: string | null,
  commentId: string | null,
  reactionType: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Check if reaction already exists
  let query = supabase
    .from("forum_reactions")
    .select("id")
    .eq("profile_id", user.id)
    .eq("reaction_type", reactionType);

  if (postId) {
    query = query.eq("post_id", postId);
  }
  if (commentId) {
    query = query.eq("comment_id", commentId);
  }

  const { data: existing } = await query.maybeSingle();

  if (existing) {
    // Remove reaction
    await supabase.from("forum_reactions").delete().eq("id", existing.id);
  } else {
    // Add reaction
    await supabase.from("forum_reactions").insert({
      profile_id: user.id,
      post_id: postId,
      comment_id: commentId,
      reaction_type: reactionType,
    });
  }

  if (postId) {
    revalidatePath(`/forum/post/${postId}`);
  }

  return { success: true, action: existing ? "removed" : "added" };
}
