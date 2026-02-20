"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, LayoutGrid, List, Printer, Users, Church as ChurchIcon, Heart, X } from "lucide-react";
import { formatPhone } from "@/lib/utils/format";
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
    (searchParams.get("tab") as TabId) || "members"
  );
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    searchParams.get("letter") || null
  );
  const [chips, setChips] = useState<string[]>(() => {
    const param = searchParams.get("chips");
    return param ? param.split(",").filter(Boolean) : [];
  });

  const debouncedSearch = useDebounce(search, 200);

  function addChip(term: string) {
    const trimmed = term.trim();
    if (!trimmed || chips.includes(trimmed)) return;
    const next = [...chips, trimmed];
    setChips(next);
    setSearch("");
    updateParams({ q: null, chips: next.join(",") });
  }

  function removeChip(term: string) {
    const next = chips.filter((c) => c !== term);
    setChips(next);
    updateParams({ chips: next.length > 0 ? next.join(",") : null });
  }

  function clearAllChips() {
    setChips([]);
    updateParams({ chips: null });
  }

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
    { id: "members" as TabId, label: "Members", count: members.length },
    { id: "families" as TabId, label: "Families", count: families.length },
    { id: "groups" as TabId, label: "Groups", count: communityGroups.length },
    { id: "ministries" as TabId, label: "Ministries", count: ministries.length },
  ];

  // Collect all search terms: chips + live typing
  const allTerms = useMemo(() => {
    const terms = chips.map((c) => c.toLowerCase());
    if (debouncedSearch) terms.push(debouncedSearch.toLowerCase());
    return terms;
  }, [chips, debouncedSearch]);

  const filteredFamilies = useMemo(() => {
    let result = families;
    if (allTerms.length > 0) {
      result = result.filter((f) => {
        const name = (f.family_name ?? "").toLowerCase();
        const display = (f.display_name ?? "").toLowerCase();
        return allTerms.some((q) => name.includes(q) || display.includes(q));
      });
    }
    if (selectedLetter) {
      result = result.filter((f) =>
        (f.family_name ?? "").toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    return result;
  }, [families, allTerms, selectedLetter]);

  const filteredMembers = useMemo(() => {
    let result = members;
    if (allTerms.length > 0) {
      result = result.filter((m) => {
        const first = (m.first_name ?? "").toLowerCase();
        const last = (m.last_name ?? "").toLowerCase();
        const full = `${first} ${last}`;
        const fam = (m.family_name ?? "").toLowerCase();
        return allTerms.some(
          (q) => first.includes(q) || last.includes(q) || full.includes(q) || fam.includes(q)
        );
      });
    }
    if (selectedLetter) {
      result = result.filter((m) =>
        (m.last_name ?? "").toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    return result;
  }, [members, allTerms, selectedLetter]);

  const availableLetters = useMemo(() => {
    if (activeTab === "families") {
      return [...new Set(
        families.map((f) => (f.family_name ?? "")[0]?.toUpperCase()).filter(Boolean)
      )].sort();
    }
    return [...new Set(
      members.map((m) => (m.last_name ?? "")[0]?.toUpperCase()).filter(Boolean)
    )].sort();
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
        <div className="flex flex-col sm:flex-row gap-3 no-print">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-700" />
            <input
              type="text"
              placeholder={chips.length > 0 ? "Add another filter..." : "Search by name..."}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateParams({ q: e.target.value || null });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  e.preventDefault();
                  addChip(search);
                } else if (e.key === "Backspace" && !search && chips.length > 0) {
                  removeChip(chips[chips.length - 1]);
                }
              }}
              className="w-full rounded-md border border-neutral-300 bg-white pl-9 pr-20 py-2 text-sm text-neutral-900 placeholder:text-neutral-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
            />
            {search.trim() && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs text-neutral-400 pointer-events-none">
                <kbd className="bg-neutral-100 border border-neutral-200 rounded px-1.5 py-0.5 font-sans text-neutral-500">Enter ↵</kbd>
                <span>to pin</span>
              </span>
            )}
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

        {/* Filter chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 no-print">
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 rounded-full bg-primary-100 text-primary-800 px-3 py-1 text-sm font-medium"
              >
                {chip}
                <button
                  onClick={() => removeChip(chip)}
                  className="hover:text-primary-950 transition-colors"
                  aria-label={`Remove filter: ${chip}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllChips}
              className="text-xs text-neutral-700 hover:text-neutral-900 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="no-print">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => {
              setActiveTab(id as TabId);
              setSelectedLetter(null);
              updateParams({ tab: id, letter: null });
            }}
          />
        </div>

        {/* Alphabet strip for members/families */}
        {(activeTab === "members" || activeTab === "families") && (
          <div className="no-print">
            <AlphabetStrip
              availableLetters={availableLetters}
              selectedLetter={selectedLetter}
              onSelect={(letter) => {
                setSelectedLetter(letter);
                updateParams({ letter });
              }}
            />
          </div>
        )}

        {/* Content */}
        {activeTab === "families" && (
          <div className="no-print">
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
          <div className="no-print">
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
          <div className="no-print">
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
          <div className="no-print">
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

        {/* Print-only compact directory listing */}
        <div className="print-only">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold font-heading">Redeemer Church Directory</h2>
            <p className="text-xs text-neutral-700">
              Printed {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {(activeTab === "members" || activeTab === "groups" || activeTab === "ministries") && (
            <div style={{ columnCount: 2, columnGap: "2em", fontSize: "9pt", lineHeight: 1.45 }}>
              {filteredMembers.map((m) => {
                const phone = m.show_phone && m.phone ? formatPhone(m.phone) : null;
                const email = m.show_email && m.email ? m.email : null;
                const address = m.show_address && m.family_address
                  ? `${m.family_address}, ${m.family_city || ""} ${m.family_state || ""} ${m.family_zip || ""}`.trim()
                  : null;
                const details = [phone, email, address].filter(Boolean);
                return (
                  <div key={m.id} style={{ breakInside: "avoid", paddingBottom: "3pt", marginBottom: "3pt", borderBottom: "0.5pt solid #e5e7eb" }}>
                    <span><strong>{m.last_name}</strong>, {m.first_name}</span>
                    {details.length > 0 && (
                      <div style={{ fontSize: "8pt", color: "#374151" }}>
                        {details.map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "families" && (
            <div style={{ columnCount: 2, columnGap: "2em", fontSize: "9pt", lineHeight: 1.45 }}>
              {filteredFamilies.map((f) => {
                const phone = f.phone ? formatPhone(f.phone) : null;
                const email = f.email || null;
                const address = f.address
                  ? `${f.address}, ${f.city || ""} ${f.state || ""} ${f.zip || ""}`.trim()
                  : null;
                const details = [phone, email, address].filter(Boolean);
                return (
                  <div key={f.id} style={{ breakInside: "avoid", paddingBottom: "3pt", marginBottom: "3pt", borderBottom: "0.5pt solid #e5e7eb" }}>
                    <strong>{f.family_name}</strong>
                    {f.display_name !== f.family_name && (
                      <span style={{ fontSize: "8pt", color: "#374151" }}> ({f.display_name})</span>
                    )}
                    {details.length > 0 && (
                      <div style={{ fontSize: "8pt", color: "#374151" }}>
                        {details.map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
