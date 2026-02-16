"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/forum";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createComment(formData);
    setLoading(false);
    if (result.success) {
      setBody("");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <Textarea
        name="body"
        placeholder="Share your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className="min-h-[80px]"
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading} disabled={!body.trim()} size="sm">
          Post Reply
        </Button>
      </div>
    </form>
  );
}
