"use client";

import { cn } from "@/lib/utils/cn";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-neutral-200", className)} role="tablist">
      <div className="flex gap-1 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 ease-in-out",
              activeTab === tab.id
                ? "border-accent-400 text-neutral-950"
                : "border-transparent text-neutral-700 hover:text-neutral-900 hover:border-neutral-300"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-2 rounded-full px-2 py-0.5 text-xs",
                  activeTab === tab.id
                    ? "bg-accent-300 text-neutral-950"
                    : "bg-neutral-200 text-neutral-700"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
