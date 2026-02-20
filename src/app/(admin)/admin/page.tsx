import { getAdminStats } from "@/lib/actions/admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, MessageSquare, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | Redeemer Church",
};

export default async function AdminPage() {
  const stats = await getAdminStats();

  const statCards = [
    {
      label: "Families",
      value: stats.familyCount,
      icon: Home,
      href: "/admin/members",
      color: "text-primary-800 bg-primary-100",
    },
    {
      label: "People",
      value: stats.memberCount,
      icon: Users,
      href: "/admin/members",
      color: "text-blue-700 bg-blue-100",
    },
    {
      label: "Forum Posts",
      value: stats.postCount,
      icon: MessageSquare,
      href: "/admin/forum",
      color: "text-emerald-700 bg-emerald-100",
    },
    {
      label: "Allowlist",
      value: `${stats.claimedCount}/${stats.allowlistCount}`,
      icon: Mail,
      href: "/admin/allowlist",
      color: "text-amber-700 bg-amber-100",
      subtitle: "claimed",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Manage your church directory and community"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card hover>
              <CardContent className="pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-heading">
                      {stat.value}
                    </p>
                    <p className="text-sm text-neutral-700">
                      {stat.label}
                      {stat.subtitle && (
                        <span className="text-xs ml-1">({stat.subtitle})</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/sync">
          <Card hover>
            <CardContent className="pt-5 text-center">
              <RefreshCw className="h-8 w-8 mx-auto text-primary-800 mb-2" />
              <h3 className="font-semibold font-heading">Sync Directory</h3>
              <p className="text-sm text-neutral-700 mt-1">
                Upload Subsplash CSV export
              </p>
              {stats.lastSyncAt && (
                <p className="text-xs text-neutral-500 mt-1">
                  Last sync: {new Date(stats.lastSyncAt).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/allowlist">
          <Card hover>
            <CardContent className="pt-5 text-center">
              <Mail className="h-8 w-8 mx-auto text-primary-800 mb-2" />
              <h3 className="font-semibold font-heading">Manage Allowlist</h3>
              <p className="text-sm text-neutral-700 mt-1">
                Invite new members by email
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/members">
          <Card hover>
            <CardContent className="pt-5 text-center">
              <Users className="h-8 w-8 mx-auto text-primary-800 mb-2" />
              <h3 className="font-semibold font-heading">Manage Directory</h3>
              <p className="text-sm text-neutral-700 mt-1">
                Edit roles and directory info
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/forum">
          <Card hover>
            <CardContent className="pt-5 text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-primary-800 mb-2" />
              <h3 className="font-semibold font-heading">Moderate Forum</h3>
              <p className="text-sm text-neutral-700 mt-1">
                Pin, lock, or remove posts
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
