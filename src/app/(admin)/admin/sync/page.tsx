import { getSyncHistory } from "@/lib/actions/sync";
import { PageHeader } from "@/components/layout/page-header";
import { SyncUpload } from "@/components/admin/sync-upload";
import { SyncHistory } from "@/components/admin/sync-history";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sync Directory | Admin | Redeemer Church",
};

export default async function AdminSyncPage() {
  const history = await getSyncHistory();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to admin
      </Link>

      <PageHeader
        title="Sync Directory"
        description="Upload a Subsplash people export CSV to sync the church directory"
      />

      <div className="space-y-6">
        <SyncUpload />
        <SyncHistory entries={history} />
      </div>
    </div>
  );
}
