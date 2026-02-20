"use client";

import { useState } from "react";
import { syncAllowlistFromDirectory } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

export function SyncAllowlistButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ added: number; skipped: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleSync() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await syncAllowlistFromDirectory();

    if ("error" in res && res.error) {
      setError(res.error);
    } else if ("added" in res) {
      setResult({ added: res.added!, skipped: res.skipped! });
    }

    setLoading(false);
    setConfirming(false);
  }

  return (
    <div className="space-y-3">
      {!confirming ? (
        <Button onClick={() => setConfirming(true)} disabled={loading}>
          Sync from Directory
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-700">
            This will add all member emails to the allowlist. Continue?
          </p>
          <Button onClick={handleSync} disabled={loading} size="sm">
            {loading ? "Syncing..." : "Yes, sync"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setConfirming(false)}
            disabled={loading}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      )}

      {result && (
        <p className="text-sm text-emerald-700">
          Added {result.added} email{result.added !== 1 ? "s" : ""}.
          {result.skipped > 0 && ` ${result.skipped} already existed.`}
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
