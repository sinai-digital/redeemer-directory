"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MemberRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  family_role: string | null;
  member_status: string | null;
  families: { family_name: string } | null;
}

type SortColumn = "first_name" | "last_name" | "email" | "family" | "family_role" | "member_status";
type SortDir = "asc" | "desc";

interface AdminPeopleTableProps {
  members: MemberRow[];
}

export function AdminPeopleTable({ members }: AdminPeopleTableProps) {
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<SortColumn>("last_name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(col: SortColumn) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return members;
    const q = search.toLowerCase();
    return members.filter((m) => {
      const first = (m.first_name ?? "").toLowerCase();
      const last = (m.last_name ?? "").toLowerCase();
      const email = (m.email ?? "").toLowerCase();
      const family = ((m.families as any)?.family_name ?? "").toLowerCase();
      return (
        first.includes(q) ||
        last.includes(q) ||
        `${first} ${last}`.includes(q) ||
        email.includes(q) ||
        family.includes(q)
      );
    });
  }, [members, search]);

  const sorted = useMemo(() => {
    const mult = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      let aVal: string;
      let bVal: string;
      switch (sortCol) {
        case "first_name":
          aVal = (a.first_name ?? "").toLowerCase();
          bVal = (b.first_name ?? "").toLowerCase();
          break;
        case "last_name":
          aVal = (a.last_name ?? "").toLowerCase();
          bVal = (b.last_name ?? "").toLowerCase();
          break;
        case "email":
          aVal = (a.email ?? "").toLowerCase();
          bVal = (b.email ?? "").toLowerCase();
          break;
        case "family":
          aVal = ((a.families as any)?.family_name ?? "").toLowerCase();
          bVal = ((b.families as any)?.family_name ?? "").toLowerCase();
          break;
        case "family_role":
          aVal = (a.family_role ?? "").toLowerCase();
          bVal = (b.family_role ?? "").toLowerCase();
          break;
        case "member_status":
          aVal = (a.member_status ?? "").toLowerCase();
          bVal = (b.member_status ?? "").toLowerCase();
          break;
        default:
          aVal = "";
          bVal = "";
      }
      if (aVal < bVal) return -1 * mult;
      if (aVal > bVal) return 1 * mult;
      return 0;
    });
  }, [filtered, sortCol, sortDir]);

  const columns: { key: SortColumn; label: string }[] = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "family", label: "Family" },
    { key: "family_role", label: "Role" },
    { key: "member_status", label: "Status" },
  ];

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-700" />
        <input
          type="text"
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white pl-9 pr-8 py-2 text-sm text-neutral-900 placeholder:text-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-neutral-700 mb-2">
        Showing {sorted.length} of {members.length} people
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-300 bg-neutral-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="text-left py-2.5 px-3 font-semibold text-sm text-neutral-600 cursor-pointer select-none hover:text-neutral-900 transition-colors"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortCol === col.key ? (
                      sortDir === "asc" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-3.5 w-3.5 opacity-30" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((member) => (
              <tr
                key={member.id}
                className="border-b border-neutral-200 hover:bg-neutral-50"
              >
                <td className="py-2 px-3 font-medium">
                  {member.first_name || <span className="text-neutral-400">--</span>}
                </td>
                <td className="py-2 px-3 font-medium">
                  {member.last_name || <span className="text-neutral-400">--</span>}
                </td>
                <td className="py-2 px-3 text-neutral-700 truncate max-w-[200px]">
                  {member.email || <span className="text-neutral-400">--</span>}
                </td>
                <td className="py-2 px-3 text-neutral-700">
                  {(member.families as any)?.family_name ?? <span className="text-neutral-400">--</span>}
                </td>
                <td className="py-2 px-3">
                  {member.family_role ? (
                    <Badge variant="muted">{member.family_role}</Badge>
                  ) : (
                    <span className="text-neutral-400">--</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {member.member_status ? (
                    <Badge
                      variant={
                        member.member_status === "member"
                          ? "success"
                          : "warning"
                      }
                    >
                      {member.member_status.replace("_", " ")}
                    </Badge>
                  ) : (
                    <span className="text-neutral-400">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
