import { getForumCategory, getCategoryPosts } from "@/lib/actions/forum";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/forum/post-card";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const category = await getForumCategory(slug);
    return { title: `${category.name} | Forum | Redeemer Church` };
  } catch {
    return { title: "Category Not Found" };
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1", 10);

  let category;
  try {
    category = await getForumCategory(slug);
  } catch {
    notFound();
  }

  const { posts, total } = await getCategoryPosts(category.id, page);
  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <Link
        href="/forum"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to forum
      </Link>

      <PageHeader
        title={category.name}
        description={category.description || undefined}
        actions={
          <Link href={`/forum/new?category=${category.id}`}>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        }
      />

      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-neutral-700">
            <p>No posts in this category yet.</p>
            <Link href={`/forum/new?category=${category.id}`}>
              <Button size="sm" className="mt-4">
                <Plus className="h-4 w-4" />
                Start a discussion
              </Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            {page > 1 && (
              <Link href={`/forum/category/${slug}?page=${page - 1}`}>
                <Button variant="secondary" size="sm">
                  Previous
                </Button>
              </Link>
            )}
            <span className="text-sm text-neutral-700">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/forum/category/${slug}?page=${page + 1}`}>
                <Button variant="secondary" size="sm">
                  Next
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
