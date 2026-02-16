import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumModActions } from "@/components/admin/forum-mod-actions";
import { ArrowLeft } from "lucide-react";
import { timeAgo } from "@/lib/utils/format";
import Link from "next/link";

export const metadata = {
  title: "Forum Moderation | Admin | Redeemer Church",
};

export default async function AdminForumPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("forum_posts")
    .select(
      "*, profiles!forum_posts_author_id_fkey(display_name, email), forum_categories(name)"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to admin
      </Link>

      <PageHeader
        title="Forum Moderation"
        description="Pin, lock, or remove forum posts"
      />

      <Card>
        <CardContent className="pt-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                    Title
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                    Author
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                    Category
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                    Status
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                    Posted
                  </th>
                  <th className="text-right py-2 px-3 font-semibold text-neutral-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="py-2 px-3">
                      <Link
                        href={`/forum/post/${post.id}`}
                        className="font-medium text-primary-800 hover:underline line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-2 px-3 text-neutral-700">
                      {(post.profiles as any)?.display_name ||
                        (post.profiles as any)?.email}
                    </td>
                    <td className="py-2 px-3">
                      <Badge variant="muted">
                        {(post.forum_categories as any)?.name}
                      </Badge>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        {post.is_pinned && (
                          <Badge variant="accent">Pinned</Badge>
                        )}
                        {post.is_locked && (
                          <Badge variant="muted">Locked</Badge>
                        )}
                        {post.status !== "published" && (
                          <Badge variant="warning">{post.status}</Badge>
                        )}
                        {post.status === "published" &&
                          !post.is_pinned &&
                          !post.is_locked && (
                            <Badge variant="success">Active</Badge>
                          )}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-neutral-700">
                      {timeAgo(post.created_at)}
                    </td>
                    <td className="py-2 px-3">
                      <ForumModActions
                        postId={post.id}
                        isPinned={post.is_pinned}
                        isLocked={post.is_locked}
                        status={post.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
