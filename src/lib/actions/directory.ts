"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchAll } from "@/lib/supabase/fetch-all";
import type { DirectoryMember } from "@/lib/types";

async function enrichMembersWithAvatars(
  supabase: Awaited<ReturnType<typeof createClient>>,
  members: any[]
) {
  const profileIds = members.map((m) => m.profile_id).filter(Boolean) as string[];
  if (profileIds.length === 0) return members.map((m) => ({ ...m, avatar_url: null }));

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, avatar_url")
    .in("id", profileIds)
    .not("avatar_url", "is", null);
  const avatarMap = new Map(
    (profiles ?? []).map((p: { id: string; avatar_url: string }) => [p.id, p.avatar_url])
  );
  return members.map((m) => ({
    ...m,
    avatar_url: m.profile_id ? avatarMap.get(m.profile_id) ?? null : null,
  }));
}

export async function getDirectoryMembers(): Promise<DirectoryMember[]> {
  const supabase = await createClient();
  const members = await fetchAll(supabase, "directory_members_view", {
    modify: (q) => q.order("sort_name"),
  });
  return enrichMembersWithAvatars(supabase, members) as Promise<DirectoryMember[]>;
}

export async function getFamilies() {
  const supabase = await createClient();
  return fetchAll(supabase, "families", {
    modify: (q) => q.order("sort_name"),
  });
}

export async function getFamily(id: string) {
  const supabase = await createClient();

  const [familyResult, membersResult] = await Promise.all([
    supabase.from("families").select("*").eq("id", id).single(),
    supabase
      .from("members")
      .select("*")
      .eq("family_id", id)
      .order("family_role")
      .order("sort_name"),
  ]);

  if (familyResult.error) throw familyResult.error;
  return {
    family: familyResult.data,
    members: await enrichMembersWithAvatars(supabase, membersResult.data || []),
  };
}

export async function getMember(id: string) {
  const supabase = await createClient();

  const { data: member, error } = await supabase
    .from("members")
    .select("*, families(*)")
    .eq("id", id)
    .single();

  if (error) throw error;

  // Get avatar
  const [enriched] = await enrichMembersWithAvatars(supabase, [member]);

  // Get community groups
  const { data: groups } = await supabase
    .from("community_group_members")
    .select("community_groups(*)")
    .eq("member_id", id);

  // Get ministries
  const { data: ministries } = await supabase
    .from("ministry_members")
    .select("ministries(*), role")
    .eq("member_id", id);

  return {
    member: enriched,
    communityGroups: groups?.map((g) => g.community_groups).filter(Boolean) || [],
    ministries:
      ministries?.map((m) => ({ ...m.ministries, role: m.role })).filter(Boolean) || [],
  };
}

export async function getCommunityGroups() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("community_groups")
    .select("*, community_group_members(count)")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getMinistries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ministries")
    .select("*, ministry_members(count)")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getCommunityGroup(id: string) {
  const supabase = await createClient();

  const { data: group, error } = await supabase
    .from("community_groups")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  // Get leader details
  let leader = null;
  if (group.leader_id) {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", group.leader_id)
      .single();
    if (data) {
      [leader] = await enrichMembersWithAvatars(supabase, [data]);
    }
  }

  // Get all group members with member details
  const { data: groupMembers } = await supabase
    .from("community_group_members")
    .select("member_id, members(*)")
    .eq("group_id", id);

  const rawMembers = groupMembers?.map((gm) => gm.members).filter(Boolean) || [];

  return {
    group,
    leader,
    members: await enrichMembersWithAvatars(supabase, rawMembers),
  };
}

export async function getMinistry(id: string) {
  const supabase = await createClient();

  const { data: ministry, error } = await supabase
    .from("ministries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  // Get contact person details
  let contact = null;
  if (ministry.contact_id) {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", ministry.contact_id)
      .single();
    if (data) {
      [contact] = await enrichMembersWithAvatars(supabase, [data]);
    }
  }

  // Get all ministry members with roles
  const { data: ministryMembers } = await supabase
    .from("ministry_members")
    .select("role, member_id, members(*)")
    .eq("ministry_id", id);

  const rawMembers = ministryMembers?.map((mm) => ({ ...mm.members, role: mm.role })).filter(Boolean) || [];
  const enrichedMembers = await enrichMembersWithAvatars(supabase, rawMembers);

  return {
    ministry,
    contact,
    members: enrichedMembers,
  };
}
