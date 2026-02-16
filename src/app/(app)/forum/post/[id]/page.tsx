import { getForumPost, getPostComments, getPostReactions } from "@/lib/actions/forum";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommentList } from "@/components/forum/comment-list";
import { CommentForm } from "@/components/forum/comment-form";
import { ReactionBar } from "@/components/forum/reaction-bar";
import { ArrowLeft, Pin, Lock } from "lucide-react";
import { timeAgo } from "@/lib/utils/format";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await getForumPost(id);
    return { title: `${post.title} | Forum | Redeemer Church` };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post;
  try {
    post = await getForumPost(id);
  } catch {
    notFound();
  }

  const [comments, reactions] = await Promise.all([
    getPostComments(id),
    getPostReactions(id),
  ]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const author = post.profiles;
  const category = post.forum_categories;
  const authorName = author?.display_name || author?.email || "Unknown";
  const nameParts = authorName.split(" ");

  // Build threaded comments
  const rootComments = comments.filter((c: any) => !c.parent_id);
  const threadedComments = rootComments.map((comment: any) => ({
    ...comment,
    replies: comments.filter((c: any) => c.parent_id === comment.id),
  }));

  return (
    <div className="max-w-4xl">
      <Link
        href={category ? `/forum/category/${category.slug}` : "/forum"}
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {category?.name || "forum"}
      </Link>

      {/* Post */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <Avatar
              firstName={nameParts[0] || "U"}
              lastName={nameParts[1] || ""}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold font-heading">
                  {post.title}
                </h1>
                {post.is_pinned && (
                  <Badge variant="accent">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
                {post.is_locked && (
                  <Badge variant="muted">
                    <Lock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-neutral-700">
                <span className="font-medium">{authorName}</span>
                <span>&middot;</span>
                <span>{timeAgo(post.created_at)}</span>
                {category && (
                  <>
                    <span>&middot;</span>
                    <Link
                      href={`/forum/category/${category.slug}`}
                      className="text-primary-800 hover:underline"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Post body */}
          <div className="mt-4 prose prose-sm max-w-none text-neutral-900 whitespace-pre-wrap">
            {post.body}
          </div>

          {/* Reactions */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <ReactionBar
              postId={post.id}
              reactions={reactions}
              currentUserId={user?.id || null}
            />
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold font-heading mb-4">
          {post.comment_count} {post.comment_count === 1 ? "Reply" : "Replies"}
        </h2>

        <CommentList comments={threadedComments} currentUserId={user?.id || null} postId={post.id} />

        {!post.is_locked && (
          <div className="mt-6">
            <CommentForm postId={post.id} />
          </div>
        )}

        {post.is_locked && (
          <div className="mt-6 text-center py-6 text-neutral-700 bg-neutral-100 rounded-lg">
            <Lock className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm">This discussion has been locked.</p>
          </div>
        )}
      </div>
    </div>
  );
}
