"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertTriangle, CheckCircle, Users, Home, X } from "lucide-react";
import { parseSubsplashCSV } from "@/lib/utils/csv-parser";
import { previewSync, executeSync } from "@/lib/actions/sync";
import type { SubsplashPerson, SyncPreview } from "@/lib/types";

type SyncState = "upload" | "preview" | "executing" | "complete";

export function SyncUpload() {
  const [state, setState] = useState<SyncState>("upload");
  const [filename, setFilename] = useState("");
  const [rows, setRows] = useState<SubsplashPerson[]>([]);
  const [preview, setPreview] = useState<SyncPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const text = await file.text();
      const parsed = parseSubsplashCSV(text);

      if (parsed.length === 0) {
        setError("No valid rows found in CSV. Ensure the file has a header row and person_id values.");
        setIsLoading(false);
        return;
      }

      setFilename(file.name);
      setRows(parsed);

      const result = await previewSync(parsed, file.name);
      setPreview(result);
      setState("preview");
    } catch (e: any) {
      setError(e.message || "Failed to parse CSV");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith(".csv")) {
        handleFileSelect(file);
      } else {
        setError("Please drop a .csv file");
      }
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleConfirm = async () => {
    setState("executing");
    setError(null);

    try {
      const result = await executeSync(rows, filename);
      setSummary(result.summary);
      setState("complete");
    } catch (e: any) {
      setError(e.message || "Sync failed");
      setState("preview");
    }
  };

  const handleReset = () => {
    setState("upload");
    setFilename("");
    setRows([]);
    setPreview(null);
    setError(null);
    setSummary(null);
  };

  // Upload state
  if (state === "upload") {
    return (
      <Card>
        <CardContent className="pt-5">
          <h3 className="font-semibold font-heading mb-4">Upload Subsplash CSV</h3>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors"
          >
            <Upload className="h-10 w-10 mx-auto text-neutral-400 mb-3" />
            <p className="text-sm text-neutral-700 mb-2">
              Drag and drop your Subsplash people export CSV here
            </p>
            <p className="text-xs text-neutral-500 mb-4">or</p>
            <label className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 ease-in-out bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 px-3 py-1.5 text-sm">
              <FileText className="h-4 w-4" />
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
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

  // Preview state
  if (state === "preview" && preview) {
    const totalMembers =
      preview.members.added.length +
      preview.members.updated.length +
      preview.members.removed.length +
      preview.members.unchanged.length;

    const membersWithProfiles = preview.members.removed.filter((m) => m.has_profile);

    return (
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold font-heading">Sync Preview</h3>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>

          <p className="text-sm text-neutral-700 mb-4">
            <span className="font-medium">{filename}</span> — {rows.length} rows parsed
          </p>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <SummaryCard
              label="Members Added"
              count={preview.members.added.length}
              variant="success"
            />
            <SummaryCard
              label="Members Updated"
              count={preview.members.updated.length}
              variant="primary"
            />
            <SummaryCard
              label="Members Removed"
              count={preview.members.removed.length}
              variant="warning"
            />
            <SummaryCard
              label="Families Added"
              count={preview.families.added.length}
              variant="success"
            />
          </div>

          <div className="text-sm text-neutral-700 mb-4">
            <p>{preview.members.unchanged.length} members unchanged, {preview.families.unchanged.length} families unchanged</p>
          </div>

          {/* Warnings */}
          {membersWithProfiles.length > 0 && (
            <div className="mb-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">
                  {membersWithProfiles.length} member(s) to be removed have linked user accounts
                </p>
                <p className="mt-1">
                  These members will NOT be auto-deleted. They must be removed manually.
                </p>
                <ul className="mt-1 list-disc list-inside">
                  {membersWithProfiles.map((m) => (
                    <li key={m.person_id}>
                      {m.first_name} {m.last_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Detail sections */}
          {preview.members.added.length > 0 && (
            <DetailSection
              title="New Members"
              icon={<Users className="h-4 w-4" />}
              items={preview.members.added.map(
                (m) => `${m.first_name} ${m.last_name}`
              )}
              variant="success"
            />
          )}

          {preview.members.updated.length > 0 && (
            <DetailSection
              title="Updated Members"
              icon={<Users className="h-4 w-4" />}
              items={preview.members.updated.map(
                (m) =>
                  `${m.first_name} ${m.last_name} (${m.changes?.join(", ")})`
              )}
              variant="primary"
            />
          )}

          {preview.members.removed.length > 0 && (
            <DetailSection
              title="Removed Members"
              icon={<Users className="h-4 w-4" />}
              items={preview.members.removed.map(
                (m) =>
                  `${m.first_name} ${m.last_name}${m.has_profile ? " (has profile — will NOT be deleted)" : ""}`
              )}
              variant="warning"
            />
          )}

          {preview.families.added.length > 0 && (
            <DetailSection
              title="New Families"
              icon={<Home className="h-4 w-4" />}
              items={preview.families.added.map((f) => f.family_name)}
              variant="success"
            />
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={handleConfirm}>Confirm Sync</Button>
            <Button variant="secondary" onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Executing state
  if (state === "executing") {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="text-center py-8">
            <svg
              className="h-10 w-10 animate-spin mx-auto text-primary-600 mb-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="font-semibold font-heading">Syncing directory...</p>
            <p className="text-sm text-neutral-700 mt-1">
              Processing {rows.length} members. This may take a moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Complete state
  if (state === "complete" && summary) {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <h3 className="font-semibold font-heading text-lg mb-2">
              Sync Complete
            </h3>
            <div className="text-sm text-neutral-700 space-y-1 mb-6">
              <p>
                {summary.members_added} members added, {summary.members_updated}{" "}
                updated, {summary.members_removed} removed
              </p>
              <p>
                {summary.families_added} families added,{" "}
                {summary.families_updated} updated, {summary.families_removed}{" "}
                removed
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button variant="secondary" onClick={handleReset}>
                Upload Another
              </Button>
              <a href="/directory">
                <Button>View Directory</Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

function SummaryCard({
  label,
  count,
  variant,
}: {
  label: string;
  count: number;
  variant: "success" | "primary" | "warning";
}) {
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    primary: "bg-primary-50 border-primary-200 text-primary-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  return (
    <div className={`rounded-md border p-3 text-center ${colors[variant]}`}>
      <p className="text-2xl font-bold font-heading">{count}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}

function DetailSection({
  title,
  icon,
  items,
  variant,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  variant: "success" | "primary" | "warning";
}) {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? items : items.slice(0, 5);

  return (
    <div className="mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-800 mb-2 hover:text-neutral-950"
      >
        {icon}
        {title} ({items.length})
        <span className="text-xs text-neutral-500">
          {expanded ? "collapse" : "expand"}
        </span>
      </button>
      <div className="pl-6 space-y-1">
        {displayed.map((item, i) => (
          <p key={i} className="text-sm text-neutral-700">
            {item}
          </p>
        ))}
        {!expanded && items.length > 5 && (
          <p className="text-xs text-neutral-500">
            ...and {items.length - 5} more
          </p>
        )}
      </div>
    </div>
  );
}
