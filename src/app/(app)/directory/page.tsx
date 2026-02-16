import { getDirectoryMembers, getFamilies, getCommunityGroups, getMinistries } from "@/lib/actions/directory";
import { DirectoryClient } from "@/components/directory/directory-client";

export const metadata = {
  title: "Directory | Redeemer Church",
};

export default async function DirectoryPage() {
  const [members, families, groups, ministries] = await Promise.all([
    getDirectoryMembers(),
    getFamilies(),
    getCommunityGroups(),
    getMinistries(),
  ]);

  return (
    <DirectoryClient
      members={members || []}
      families={families || []}
      communityGroups={groups || []}
      ministries={ministries || []}
    />
  );
}
