import { getAllowlist, getInviteStats } from "@/lib/actions/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AllowlistTable } from "@/components/admin/allowlist-table";
import { AddToAllowlistForm } from "@/components/admin/add-allowlist-form";
import { SyncAllowlistButton } from "@/components/admin/sync-allowlist-button";
import { SendInvitesButton } from "@/components/admin/send-invites-button";
import { ArrowLeft, Mail, CheckCircle, Clock, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Email Allowlist | Admin | Redeemer Church",
};

export default async function AllowlistPage() {
  const [allowlist, stats] = await Promise.all([
    getAllowlist(),
    getInviteStats(),
  ]);

  const statCards = [
    {
      label: "Total on Allowlist",
      value: stats.total,
      icon: Users,
      color: "text-primary-800 bg-primary-100",
    },
    {
      label: "Invited",
      value: stats.invited,
      icon: Mail,
      color: "text-blue-700 bg-blue-100",
    },
    {
      label: "Not Yet Invited",
      value: stats.notInvited,
      icon: Clock,
      color: "text-amber-700 bg-amber-100",
    },
    {
      label: "Signed In",
      value: stats.signedIn,
      icon: CheckCircle,
      color: "text-green-700 bg-green-100",
    },
  ];

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
        description="Manage who can sign up and send invite emails"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{stat.value}</p>
                  <p className="text-xs text-neutral-700">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-2">Sync Allowlist from Directory</h3>
            <p className="text-sm text-neutral-700 mb-3">
              Add all member emails to the allowlist (for magic link sign-in).
              Emails already on the list will be skipped.
            </p>
            <SyncAllowlistButton />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-3">Add Email</h3>
            <AddToAllowlistForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-2">Send Invite Emails</h3>
            <p className="text-sm text-neutral-700 mb-4">
              Send invite emails to allowlist members who haven&apos;t been invited yet.
              Each email contains a link to the login page where they can sign in via
              magic link. Resend&apos;s free tier allows 100 emails per day.
            </p>
            <SendInvitesButton remaining={stats.notInvited} />
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
