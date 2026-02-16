"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { togglePostPin, togglePostLock, removePost } from "@/lib/actions/admin";
import { Pin, Lock, Trash2 } from "lucide-react";

interface ForumModActionsProps {
  postId: string;
  isPinned: boolean;
  isLocked: boolean;
  status: string;
}

export function ForumModActions({
  postId,
  isPinned,
  isLocked,
  status,
}: ForumModActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handlePin() {
    setLoading("pin");
    await togglePostPin(postId);
    setLoading(null);
  }

  async function handleLock() {
    setLoading("lock");
    await togglePostLock(postId);
    setLoading(null);
  }

  async function handleRemove() {
    if (!confirm("Remove this post? It will no longer be visible.")) return;
    setLoading("remove");
    await removePost(postId);
    setLoading(null);
  }

  return (
    <div className="flex items-center gap-1 justify-end">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePin}
        loading={loading === "pin"}
        className={isPinned ? "text-accent-500" : "text-neutral-700"}
        title={isPinned ? "Unpin" : "Pin"}
      >
        <Pin className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLock}
        loading={loading === "lock"}
        className={isLocked ? "text-primary-800" : "text-neutral-700"}
        title={isLocked ? "Unlock" : "Lock"}
      >
        <Lock className="h-4 w-4" />
      </Button>
      {status === "published" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          loading={loading === "remove"}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Remove"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
