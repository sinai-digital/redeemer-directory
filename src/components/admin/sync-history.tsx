"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, AlertTriangle } from "lucide-react";
import { rollbackSync } from "@/lib/actions/sync";
import type { SyncHistoryEntry } from "@/lib/types";

interface SyncHistoryProps {
  entries: SyncHistoryEntry[];
}

export function SyncHistory({ entries }: SyncHistoryProps) {
  const [rollbackId, setRollbackId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-5">
          <h3 className="font-semibold font-heading mb-2">Sync History</h3>
          <p className="text-sm text-neutral-700">No syncs performed yet.</p>
        </CardContent>
      </Card>
    );
  }

  const handleRollback = async () => {
    if (!rollbackId) return;
    setIsLoading(true);
    setError(null);

    try {
      await rollbackSync(rollbackId);
      window.location.reload();
    } catch (e: any) {
      setError(e.message || "Rollback failed");
      setIsLoading(false);
      setConfirming(false);
    }
  };

  // Most recent non-rolled-back entry can be rolled back
  const rollbackCandidate = entries.find((e) => !e.rolled_back_at);

  return (
    <Card>
      <CardContent className="pt-5">
        <h3 className="font-semibold font-heading mb-4">Sync History</h3>

        <div className="space-y-3">
          {entries.map((entry) => {
            const date = new Date(entry.performed_at);
            const isRollbackTarget = rollbackCandidate?.id === entry.id;

            return (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 bg-neutral-50 rounded-md"
              >
                <Clock className="h-4 w-4 text-neutral-400 mt-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    {entry.rolled_back_at && (
                      <Badge variant="warning">Rolled back</Badge>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {entry.csv_filename} — {entry.csv_row_count} rows
                    {entry.performer && (
                      <> by {entry.performer.display_name || entry.performer.email}</>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <Badge variant="success">
                      +{entry.summary.members_added} members
                    </Badge>
                    <Badge variant="primary">
                      ~{entry.summary.members_updated} updated
                    </Badge>
                    {entry.summary.members_removed > 0 && (
                      <Badge variant="warning">
                        -{entry.summary.members_removed} removed
                      </Badge>
                    )}
                    <Badge variant="success">
                      +{entry.summary.families_added} families
                    </Badge>
                  </div>
                </div>

                {/* Rollback button — only on most recent non-rolled-back entry */}
                {isRollbackTarget && !entry.rolled_back_at && (
                  <div className="shrink-0">
                    {confirming && rollbackId === entry.id ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          loading={isLoading}
                          onClick={handleRollback}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setConfirming(false);
                            setRollbackId(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setRollbackId(entry.id);
                          setConfirming(true);
                        }}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Rollback
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
