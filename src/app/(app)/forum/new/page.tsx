import { getForumCategories } from "@/lib/actions/forum";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { PostForm } from "@/components/forum/post-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "New Post | Forum | Redeemer Church",
};

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: defaultCategoryId } = await searchParams;
  const categories = await getForumCategories();

  return (
    <div className="max-w-2xl">
      <Link
        href="/forum"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to forum
      </Link>

      <PageHeader title="New Post" />

      <Card>
        <CardContent className="pt-5">
          <PostForm
            categories={categories}
            defaultCategoryId={defaultCategoryId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
