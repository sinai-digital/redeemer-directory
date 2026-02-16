"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeFromAllowlist } from "@/lib/actions/admin";
import { formatFullDate } from "@/lib/utils/format";
import { Trash2 } from "lucide-react";

interface AllowlistEntry {
  email: string;
  claimed_at: string | null;
  created_at: string;
}

interface AllowlistTableProps {
  allowlist: AllowlistEntry[];
}

export function AllowlistTable({ allowlist }: AllowlistTableProps) {
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);

  async function handleRemove(email: string) {
    if (!confirm(`Remove ${email} from the allowlist?`)) return;
    setRemovingEmail(email);
    await removeFromAllowlist(email);
    setRemovingEmail(null);
  }

  if (allowlist.length === 0) {
    return (
      <p className="text-sm text-neutral-700 text-center py-8">
        No emails on the allowlist yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-2 px-3 font-semibold text-neutral-700">
              Email
            </th>
            <th className="text-left py-2 px-3 font-semibold text-neutral-700">
              Status
            </th>
            <th className="text-left py-2 px-3 font-semibold text-neutral-700">
              Added
            </th>
            <th className="text-right py-2 px-3 font-semibold text-neutral-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {allowlist.map((entry) => (
            <tr
              key={entry.email}
              className="border-b border-neutral-100 hover:bg-neutral-50"
            >
              <td className="py-2 px-3 font-medium">{entry.email}</td>
              <td className="py-2 px-3">
                {entry.claimed_at ? (
                  <Badge variant="success">Claimed</Badge>
                ) : (
                  <Badge variant="warning">Pending</Badge>
                )}
              </td>
              <td className="py-2 px-3 text-neutral-700">
                {formatFullDate(entry.created_at)}
              </td>
              <td className="py-2 px-3 text-right">
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
