import { getAllowlist } from "@/lib/actions/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AllowlistTable } from "@/components/admin/allowlist-table";
import { AddToAllowlistForm } from "@/components/admin/add-allowlist-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Allowlist | Admin | Redeemer Church",
};

export default async function AllowlistPage() {
  const allowlist = await getAllowlist();

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
        title="Email Allowlist"
        description="Manage who can sign up for the directory"
      />

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-3">Add Email</h3>
            <AddToAllowlistForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <AllowlistTable allowlist={allowlist} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
