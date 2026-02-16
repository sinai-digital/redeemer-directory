"use client";

import { useState, useOptimistic } from "react";
import { cn } from "@/lib/utils/cn";
import { toggleReaction } from "@/lib/actions/reactions";
import { REACTION_TYPES, REACTION_LABELS, type ReactionType } from "@/lib/utils/constants";

interface Reaction {
  id: string;
  profile_id: string;
  reaction_type: string;
}

interface ReactionBarProps {
  postId: string;
  commentId?: string;
  reactions: Reaction[];
  currentUserId: string | null;
}

export function ReactionBar({
  postId,
  commentId,
  reactions,
  currentUserId,
}: ReactionBarProps) {
  const [optimisticReactions, addOptimistic] = useOptimistic(
    reactions,
    (state: Reaction[], { type, action }: { type: string; action: "add" | "remove" }) => {
      if (action === "remove") {
        return state.filter(
          (r) => !(r.profile_id === currentUserId && r.reaction_type === type)
        );
      }
      return [
        ...state,
        {
          id: `temp-${Date.now()}`,
          profile_id: currentUserId || "",
          reaction_type: type,
        },
      ];
    }
  );

  async function handleReaction(type: ReactionType) {
    if (!currentUserId) return;

    const hasReacted = optimisticReactions.some(
      (r) => r.profile_id === currentUserId && r.reaction_type === type
    );

    addOptimistic({ type, action: hasReacted ? "remove" : "add" });
    await toggleReaction(postId, commentId || null, type);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {REACTION_TYPES.map((type) => {
        const count = optimisticReactions.filter(
          (r) => r.reaction_type === type
        ).length;
        const hasReacted =
          currentUserId &&
          optimisticReactions.some(
            (r) => r.profile_id === currentUserId && r.reaction_type === type
          );
        const { emoji, label } = REACTION_LABELS[type];

        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={!currentUserId}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200 border",
              hasReacted
                ? "bg-primary-50 border-primary-200 text-primary-800"
                : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100",
              !currentUserId && "opacity-50 cursor-not-allowed"
            )}
            title={label}
          >
            <span>{emoji}</span>
            {count > 0 && <span className="text-xs font-medium">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
