import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Megaphone,
  BookOpen,
  Users,
  HandHeart,
  Baby,
  PartyPopper,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ForumCategory } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Megaphone,
  BookOpen,
  Users,
  HandHeart,
  Baby,
  PartyPopper,
  MessageCircle,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  rose: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  slate: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
};

interface CategoryCardProps {
  category: ForumCategory & { post_count?: number };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon || "MessageCircle"] || MessageCircle;
  const colors = colorMap[category.color || "slate"] || colorMap.slate;

  return (
    <Link href={`/forum/category/${category.slug}`}>
      <Card hover className={cn("border-l-4", colors.border)}>
        <div className="p-4 flex items-start gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              colors.bg,
              colors.text
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-neutral-950 text-sm">
              {category.name}
            </h3>
            <p className="text-xs text-neutral-700 mt-0.5 line-clamp-2">
              {category.description}
            </p>
            {category.post_count !== undefined && (
              <p className="text-xs text-neutral-700 mt-1.5 font-medium">
                {category.post_count} {category.post_count === 1 ? "post" : "posts"}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
