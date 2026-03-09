"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { removeFromAllowlist, sendSingleInvite } from "@/lib/actions/admin";
import { formatFullDate } from "@/lib/utils/format";
import { Trash2, Send } from "lucide-react";

interface AllowlistEntry {
  email: string;
  is_onboarded: boolean;
  invite_sent_at: string | null;
  created_at: string;
}

interface AllowlistTableProps {
  allowlist: AllowlistEntry[];
}

export function AllowlistTable({ allowlist }: AllowlistTableProps) {
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

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
              Invited
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
