"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeFromAllowlist, sendSingleInvite } from "@/lib/actions/admin";
import { formatFullDate } from "@/lib/utils/format";
import { Trash2, Send, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface AllowlistEntry {
  email: string;
  is_onboarded: boolean;
  invite_sent_at: string | null;
  created_at: string;
}

interface AllowlistTableProps {
  allowlist: AllowlistEntry[];
}

type SortColumn = "email" | "status" | "invite_sent_at" | "created_at";
type SortDir = "asc" | "desc";

function statusRank(entry: AllowlistEntry): number {
  if (entry.is_onboarded) return 2;   // Signed In
  if (entry.invite_sent_at) return 1;  // Invited
  return 0;                            // Pending
}

export function AllowlistTable({ allowlist }: AllowlistTableProps) {
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sortCol, setSortCol] = useState<SortColumn>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(col: SortColumn) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    const mult = sortDir === "asc" ? 1 : -1;
    return [...allowlist].sort((a, b) => {
      switch (sortCol) {
        case "email": {
          const aVal = a.email.toLowerCase();
          const bVal = b.email.toLowerCase();
          if (aVal < bVal) return -1 * mult;
          if (aVal > bVal) return 1 * mult;
          return 0;
        }
        case "status": {
          const aRank = statusRank(a);
          const bRank = statusRank(b);
          if (aRank < bRank) return -1 * mult;
          if (aRank > bRank) return 1 * mult;
          return 0;
        }
        case "invite_sent_at": {
          const aDate = a.invite_sent_at;
          const bDate = b.invite_sent_at;
          // Nulls always pushed to end regardless of direction
          if (!aDate && !bDate) return 0;
          if (!aDate) return 1;
          if (!bDate) return -1;
          if (aDate < bDate) return -1 * mult;
          if (aDate > bDate) return 1 * mult;
          return 0;
        }
        case "created_at": {
          if (a.created_at < b.created_at) return -1 * mult;
          if (a.created_at > b.created_at) return 1 * mult;
          return 0;
        }
        default:
          return 0;
      }
    });
  }, [allowlist, sortCol, sortDir]);

  async function handleRemove(email: string) {
    if (!confirm(`Remove ${email} from the allowlist?`)) return;
    setRemovingEmail(email);
    await removeFromAllowlist(email);
    setRemovingEmail(null);
  }

  async function handleSendInvite(email: string) {
    setSendingEmail(email);
    const result = await sendSingleInvite(email);
    setSendingEmail(null);
    if (result.error) {
      alert(`Failed to send invite: ${result.error}`);
    }
  }

  if (allowlist.length === 0) {
    return (
      <p className="text-sm text-neutral-700 text-center py-8">
        No emails on the allowlist yet.
      </p>
    );
  }

  const columns: { key: SortColumn; label: string }[] = [
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "invite_sent_at", label: "Invited" },
    { key: "created_at", label: "Added" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className="text-left py-2 px-3 font-semibold text-neutral-700 cursor-pointer select-none hover:text-neutral-900 transition-colors"
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
            <th className="text-right py-2 px-3 font-semibold text-neutral-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr
              key={entry.email}
              className="border-b border-neutral-100 hover:bg-neutral-50"
            >
              <td className="py-2 px-3 font-medium">{entry.email}</td>
              <td className="py-2 px-3">
                {entry.is_onboarded ? (
                  <Badge variant="success">Signed In</Badge>
                ) : entry.invite_sent_at ? (
                  <Badge variant="info">Invited</Badge>
                ) : (
                  <Badge variant="warning">Pending</Badge>
                )}
              </td>
              <td className="py-2 px-3 text-neutral-700">
                {entry.invite_sent_at ? (
                  <span className="text-xs">{formatFullDate(entry.invite_sent_at)}</span>
                ) : (
                  <span className="text-xs text-neutral-400">—</span>
                )}
              </td>
              <td className="py-2 px-3 text-neutral-700">
                {formatFullDate(entry.created_at)}
              </td>
              <td className="py-2 px-3 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSendInvite(entry.email)}
                  loading={sendingEmail === entry.email}
                  className={entry.is_onboarded ? "text-neutral-400 hover:text-neutral-500 hover:bg-neutral-50" : "text-primary-700 hover:text-primary-800 hover:bg-primary-50"}
                  title={entry.is_onboarded ? "Resend invite" : "Send invite"}
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(entry.email)}
                  loading={removingEmail === entry.email}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
