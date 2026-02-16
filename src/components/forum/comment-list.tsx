"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { ReplyForm } from "./reply-form";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  body: string;
  created_at: string;
  profiles: {
    id: string;
    display_name: string | null;
    email: string;
  };
  replies?: Comment[];
}

interface CommentListProps {
  comments: Comment[];
  currentUserId: string | null;
  postId: string;
  depth?: number;
}

export function CommentList({ comments, currentUserId, postId, depth = 0 }: CommentListProps) {
  return (
    <div className={cn("space-y-4", depth > 0 && "ml-6 sm:ml-10 mt-4")}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          postId={postId}
          depth={depth}
        />
      ))}
    </div>
  );
}

function CommentItem({
  comment,
  currentUserId,
  postId,
  depth,
}: {
  comment: Comment;
  currentUserId: string | null;
  postId: string;
  depth: number;
}) {
  const [showReply, setShowReply] = useState(false);
  const author = comment.profiles;
  const authorName = author?.display_name || author?.email || "Unknown";
  const nameParts = authorName.split(" ");

  return (
    <div>
      <Card className={cn(depth > 0 && "border-l-2 border-l-primary-200")}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Avatar
              firstName={nameParts[0] || "U"}
              lastName={nameParts[1] || ""}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-neutral-950">{authorName}</span>
                <span className="text-neutral-700">{timeAgo(comment.created_at)}</span>
              </div>
              <p className="text-sm text-neutral-900 mt-1 whitespace-pre-wrap">
                {comment.body}
              </p>
              {currentUserId && depth < 2 && (
                <button
                  onClick={() => setShowReply(!showReply)}
                  className="flex items-center gap-1 text-xs text-neutral-700 hover:text-primary-800 mt-2 transition-colors"
                >
                  <MessageSquare className="h-3 w-3" />
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {showReply && (
        <div className="ml-6 sm:ml-10 mt-2">
          <ReplyForm
            postId={postId}
            parentId={comment.id}
            onCancel={() => setShowReply(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <CommentList
          comments={comment.replies}
          currentUserId={currentUserId}
          postId={postId}
          depth={depth + 1}
        />
      )}
    </div>
  );
}
