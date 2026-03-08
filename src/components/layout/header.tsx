"use client";

import { Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import type { Profile } from "@/lib/types";

interface HeaderProps {
  profile: Profile | null;
  onMenuToggle?: () => void;
}

export function Header({ profile, onMenuToggle }: HeaderProps) {
  const displayName = profile?.display_name || profile?.email || "User";
  const nameParts = displayName.split(" ");
  const firstName = nameParts[0] || "U";
  const lastName = nameParts[1] || "";

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between no-print">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-primary-900 font-heading">
            Redeemer Church
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar firstName={firstName} lastName={lastName} avatarUrl={profile?.avatar_url} size="sm" />
          <span className="hidden sm:block text-sm font-medium text-neutral-900 max-w-[120px] truncate">
            {firstName}
          </span>
        </a>
      </div>
    </header>
  );
}
