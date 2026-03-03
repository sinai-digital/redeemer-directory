"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bulkCreateAccounts } from "@/lib/actions/admin";
import { AlertTriangle, CheckCircle, Users } from "lucide-react";

export function BulkCreateAccounts() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<{
    created: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await bulkCreateAccounts(password);

    setLoading(false);
    setShowConfirm(false);

    if ("error" in res && res.error) {
      setError(res.error);
    } else if ("created" in res) {
      setResult(res as { created: number; skipped: number; errors: string[] });
    }
  }

  if (result) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
          <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">
              {result.created} account{result.created !== 1 ? "s" : ""} created
            </p>
            {result.skipped > 0 && (
              <p>{result.skipped} already had accounts (skipped)</p>
            )}
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
            setPassword("");
          }}
        >
          Done
        </Button>
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">
              This will create login accounts for all directory members with email addresses.
            </p>
            <p className="mt-1">
              Each account will use the default password you entered. Members
              will be required to change it on their first login.
            </p>
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button onClick={handleCreate} loading={loading}>
            <Users className="h-4 w-4" />
            Create Accounts
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

  return (
    <div className="space-y-3">
      <Input
        id="defaultPassword"
        name="defaultPassword"
        type="text"
        label="Default Password"
        placeholder="e.g. redeemer2026"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        minLength={8}
      />
      <p className="text-xs text-neutral-500">
        All new accounts will use this password. Members must change it on first login.
      </p>
      <Button
        size="sm"
        onClick={() => setShowConfirm(true)}
        disabled={password.length < 8}
      >
        Continue
      </Button>
    </div>
  );
}
