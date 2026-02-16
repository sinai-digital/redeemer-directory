import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Pin } from "lucide-react";
import { timeAgo } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface PostCardProps {
  post: any;
  compact?: boolean;
}

export function PostCard({ post, compact }: PostCardProps) {
  const author = post.profiles;
  const category = post.forum_categories;
  const authorName = author?.display_name || author?.email || "Unknown";
  const nameParts = authorName.split(" ");

  if (compact) {
    return (
      <Link href={`/forum/post/${post.id}`}>
        <Card hover>
          <div className="p-3">
            <div className="flex items-start gap-2">
              {post.is_pinned && (
                <Pin className="h-3.5 w-3.5 text-accent-500 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-950 line-clamp-1">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {category && (
                    <Badge variant="muted" className="text-[10px] px-1.5">
                      {category.name}
                    </Badge>
                  )}
                  <span className="text-xs text-neutral-700">
                    {timeAgo(post.last_activity_at || post.created_at)}
                  </span>
                  {post.comment_count > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-neutral-700">
                      <MessageSquare className="h-3 w-3" />
                      {post.comment_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/forum/post/${post.id}`}>
      <Card hover>
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Avatar
              firstName={nameParts[0] || "U"}
              lastName={nameParts[1] || ""}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {post.is_pinned && (
                  <Pin className="h-4 w-4 text-accent-500 shrink-0" />
                )}
                <h3
                  className={cn(
                    "font-semibold text-neutral-950 line-clamp-1",
                    post.is_pinned && "text-primary-900"
                  )}
                >
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-700 mt-1 line-clamp-2">
                {post.body.replace(/[#*_`>\[\]]/g, "").slice(0, 150)}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-neutral-700">
                <span className="font-medium">{authorName}</span>
                <span>{timeAgo(post.created_at)}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {post.comment_count} {post.comment_count === 1 ? "reply" : "replies"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
