"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendInviteEmails } from "@/lib/actions/admin";
import { AlertTriangle, CheckCircle, Mail } from "lucide-react";

interface SendInvitesButtonProps {
  remaining: number;
}

export function SendInvitesButton({ remaining }: SendInvitesButtonProps) {
  const [loading, setLoading] = useState(false);
  const [batchSize, setBatchSize] = useState(Math.min(remaining, 10));
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<{
    sent: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await sendInviteEmails(batchSize);

    setLoading(false);
    setShowConfirm(false);

    if ("error" in res && res.error) {
      setError(res.error as string);
    } else if ("sent" in res) {
      setResult({ sent: res.sent ?? 0, errors: res.errors || [] });
    }
  }

  if (remaining === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
        <CheckCircle className="h-4 w-4 shrink-0" />
        All allowlist members have been invited.
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
          <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">
              {result.sent} invite{result.sent !== 1 ? "s" : ""} sent successfully
            </p>
          </div>
        </div>
        {result.errors.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{result.errors.length} error(s):</p>
              <ul className="mt-1 list-disc list-inside">
                {result.errors.slice(0, 10).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
                {result.errors.length > 10 && (
                  <li>...and {result.errors.length - 10} more</li>
                )}
              </ul>
            </div>
          </div>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setResult(null);
            window.location.reload();
          }}
        >
          Done
        </Button>
      </div>
    );
  }

  const isAll = batchSize === remaining;

  if (showConfirm) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">
              Send {batchSize} invite email{batchSize !== 1 ? "s" : ""}?
            </p>
            <p className="mt-1">
              Each recipient will receive an email with a link to sign in to the directory.
            </p>
            {isAll && (
              <p className="mt-1 font-medium">
                This will send invites to all {remaining} remaining people at once.
              </p>
            )}
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button onClick={handleSend} loading={loading}>
            <Mail className="h-4 w-4" />
            Send Invites
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirm(false);
              setError(null);
            }}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const presets = [5, 10, 25, 50, 100].filter((n) => n < remaining);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-neutral-700">
          Batch size:
        </label>
        <select
          value={batchSize}
          onChange={(e) => setBatchSize(Number(e.target.value))}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          {presets.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value={remaining}>All ({remaining})</option>
        </select>
        <span className="text-sm text-neutral-500">
          of {remaining} remaining
        </span>
      </div>
      <Button size="sm" onClick={() => setShowConfirm(true)}>
        Continue
      </Button>
    </div>
  );
}
