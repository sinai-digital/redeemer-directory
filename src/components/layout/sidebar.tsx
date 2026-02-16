"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  MessageSquare,
  User,
  Shield,
  X,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { signOut } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";

interface SidebarProps {
  profile: Profile | null;
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/profile", label: "My Profile", icon: User },
];

const adminItems = [
  { href: "/admin", label: "Admin", icon: Shield },
];

export function Sidebar({ profile, open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto no-print",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-primary-800">
          <Link href="/forum" className="flex items-center gap-2" onClick={onClose}>
            <Image src="/logo.png" alt="Redeemer Church" width={40} height={36} className="shrink-0" />
            <div>
              <span className="text-base font-semibold font-heading">Redeemer</span>
              <span className="text-xs text-primary-200 block -mt-0.5">PCA · Riverview</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-primary-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-800 text-white"
                    : "text-primary-200 hover:bg-primary-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1 h-5 rounded-full bg-accent-400" />
                )}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="pt-4 pb-2">
                <p className="px-3 text-xs font-semibold text-primary-300 uppercase tracking-wider">
                  Admin
                </p>
              </div>
              {adminItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary-800 text-white"
                        : "text-primary-200 hover:bg-primary-800 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto w-1 h-5 rounded-full bg-accent-400" />
                    )}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-primary-800">
          <a
            href="https://redeemerriverview.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-200 hover:bg-primary-800 hover:text-white transition-colors"
          >
            <ExternalLink className="h-5 w-5 shrink-0" />
            Church Website
          </a>
          <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-1">
            <p className="text-xs text-primary-200 truncate min-w-0">
              {profile?.email}
            </p>
            <form action={signOut}>
              <button
                type="submit"
                className="p-1.5 rounded-md text-primary-300 hover:text-white hover:bg-primary-800 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
