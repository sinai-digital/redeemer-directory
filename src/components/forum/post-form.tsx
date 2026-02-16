"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { createForumPost } from "@/lib/actions/forum";
import type { ForumCategory } from "@/lib/types";

interface PostFormProps {
  categories: ForumCategory[];
  defaultCategoryId?: string;
}

export function PostForm({ categories, defaultCategoryId }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createForumPost(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.post) {
      router.push(`/forum/post/${result.post.id}`);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <Select
        id="categoryId"
        name="categoryId"
        label="Category"
        options={categoryOptions}
        defaultValue={defaultCategoryId}
        required
      />

      <Input
        id="title"
        name="title"
        label="Title"
        placeholder="What would you like to discuss?"
        required
      />

      <Textarea
        id="body"
        name="body"
        label="Content"
        placeholder="Share your thoughts... (Markdown supported)"
        required
        className="min-h-[200px]"
      />

      <div className="flex items-center gap-3 justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Publish Post
        </Button>
      </div>
    </form>
  );
}
