"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/forum";

interface ReplyFormProps {
  postId: string;
  parentId: string;
  onCancel: () => void;
}

export function ReplyForm({ postId, parentId, onCancel }: ReplyFormProps) {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createComment(formData);
    setLoading(false);
    if (result.success) {
      setBody("");
      onCancel();
    }
  }

  return (
    <form action={handleSubmit} className="space-y-2">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="parentId" value={parentId} />
      <Textarea
        name="body"
        placeholder="Write a reply..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className="min-h-[60px] text-sm"
        autoFocus
      />
      <div className="flex items-center gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} disabled={!body.trim()} size="sm">
          Reply
        </Button>
      </div>
    </form>
  );
}
