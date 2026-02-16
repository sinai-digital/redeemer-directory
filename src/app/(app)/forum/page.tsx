import { getForumCategories, getRecentPosts } from "@/lib/actions/forum";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/forum/category-card";
import { PostCard } from "@/components/forum/post-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Forum | Redeemer Church",
};

export default async function ForumPage() {
  const [categories, recentPosts] = await Promise.all([
    getForumCategories(),
    getRecentPosts(10),
  ]);

  return (
    <div>
      <PageHeader
        title="Community Forum"
        description="Discuss, share, and connect with your church family"
        actions={
          <Link href="/forum/new">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold font-heading mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-lg font-semibold font-heading mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
            {recentPosts.length === 0 && (
              <p className="text-sm text-neutral-700 text-center py-8">
                No posts yet. Be the first to start a discussion!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
