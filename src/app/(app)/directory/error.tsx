"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DirectoryError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h2 className="text-lg font-semibold font-heading mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-neutral-700 mb-6 max-w-md">
        We couldn&apos;t load the directory. This might be a temporary issue.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
