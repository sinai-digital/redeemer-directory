"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, LayoutGrid, List, Printer, Users, Church as ChurchIcon, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/page-header";
import { MemberCard } from "./member-card";
import { FamilyCard } from "./family-card";
import { AlphabetStrip } from "./alphabet-strip";
import { GroupCard } from "./group-card";
import { MinistryCard } from "./ministry-card";
import { useDebounce } from "@/lib/hooks/use-debounce";
import type { DirectoryMember, Family, CommunityGroup, Ministry } from "@/lib/types";

interface DirectoryClientProps {
  members: DirectoryMember[];
  families: Family[];
  communityGroups: CommunityGroup[];
  ministries: Ministry[];
}

type ViewMode = "grid" | "list";
type TabId = "members" | "families" | "groups" | "ministries";

export function DirectoryClient({
  members,
  families,
  communityGroups,
  ministries,
}: DirectoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) || "grid"
  );
  const [activeTab, setActiveTab] = useState<TabId>(
    (searchParams.get("tab") as TabId) || "families"
  );
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    searchParams.get("letter") || null
  );

  const debouncedSearch = useDebounce(search, 200);

  // Update URL params
  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const tabs = [
    { id: "families" as TabId, label: "Families", count: families.length },
    { id: "members" as TabId, label: "Members", count: members.length },
    { id: "groups" as TabId, label: "Groups", count: communityGroups.length },
    { id: "ministries" as TabId, label: "Ministries", count: ministries.length },
  ];

  const filteredFamilies = useMemo(() => {
    let result = families;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (f) =>
          f.family_name.toLowerCase().includes(q) ||
          f.display_name.toLowerCase().includes(q)
      );
    }
    if (selectedLetter) {
      result = result.filter((f) =>
        f.family_name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    return result;
  }, [families, debouncedSearch, selectedLetter]);

  const filteredMembers = useMemo(() => {
    let result = members;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (m) =>
          m.first_name.toLowerCase().includes(q) ||
          m.last_name.toLowerCase().includes(q) ||
          `${m.first_name} ${m.last_name}`.toLowerCase().includes(q) ||
          m.family_name.toLowerCase().includes(q)
      );
    }
    if (selectedLetter) {
      result = result.filter((m) =>
        m.last_name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    return result;
  }, [members, debouncedSearch, selectedLetter]);

  const availableLetters = useMemo(() => {
    if (activeTab === "families") {
      return [...new Set(families.map((f) => f.family_name[0].toUpperCase()))].sort();
    }
    return [...new Set(members.map((m) => m.last_name[0].toUpperCase()))].sort();
  }, [activeTab, families, members]);

  return (
    <div>
      <PageHeader
        title="Church Directory"
        description="Find and connect with fellow church members"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="hidden sm:inline-flex"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
        }
      />

      <div className="space-y-4">
        {/* Search and view toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-700" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateParams({ q: e.target.value || null });
              }}
              className="w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
            />
          </div>
          <div className="flex items-center gap-1 bg-neutral-100 rounded-md p-1">
            <button
              onClick={() => {
                setViewMode("grid");
                updateParams({ view: "grid" });
              }}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-primary-800"
                  : "text-neutral-700 hover:text-neutral-900"
              } transition-all`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setViewMode("list");
                updateParams({ view: "list" });
              }}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-primary-800"
                  : "text-neutral-700 hover:text-neutral-900"
              } transition-all`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => {
            setActiveTab(id as TabId);
            setSelectedLetter(null);
            updateParams({ tab: id, letter: null });
          }}
        />

        {/* Alphabet strip for members/families */}
        {(activeTab === "members" || activeTab === "families") && (
          <AlphabetStrip
            availableLetters={availableLetters}
            selectedLetter={selectedLetter}
            onSelect={(letter) => {
              setSelectedLetter(letter);
              updateParams({ letter });
            }}
          />
        )}

        {/* Content */}
        {activeTab === "families" && (
          <div>
            {filteredFamilies.length === 0 ? (
              <EmptyState icon={<Users className="h-12 w-12" />} message="No families found" />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFamilies.map((family) => (
                  <FamilyCard key={family.id} family={family} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFamilies.map((family) => (
                  <FamilyCard key={family.id} family={family} variant="list" />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "members" && (
          <div>
            {filteredMembers.length === 0 ? (
              <EmptyState icon={<Users className="h-12 w-12" />} message="No members found" />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} variant="list" />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "groups" && (
          <div>
            {communityGroups.length === 0 ? (
              <EmptyState icon={<ChurchIcon className="h-12 w-12" />} message="No community groups yet" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "ministries" && (
          <div>
            {ministries.length === 0 ? (
              <EmptyState icon={<Heart className="h-12 w-12" />} message="No ministries yet" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ministries.map((ministry) => (
                  <MinistryCard key={ministry.id} ministry={ministry} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="text-center py-12 text-neutral-700">
      <div className="mx-auto mb-4 text-neutral-300">{icon}</div>
      <p>{message}</p>
    </div>
  );
}
