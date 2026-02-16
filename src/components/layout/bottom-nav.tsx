"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, MessageSquare, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Profile } from "@/lib/types";

interface BottomNavProps {
  profile: Profile | null;
}

export function BottomNav({ profile }: BottomNavProps) {
  const pathname = usePathname();
  const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";

  const items = [
    { href: "/forum", label: "Forum", icon: MessageSquare },
    { href: "/directory", label: "Directory", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
    ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 lg:hidden no-print">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary-800"
                  : "text-neutral-700 hover:text-neutral-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary-800")} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-accent-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
