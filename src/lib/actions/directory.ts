"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDirectoryMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("directory_members_view")
    .select("*")
    .eq("member_status", "active")
    .order("sort_name");

  if (error) throw error;
  return data;
}

export async function getFamilies() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("families")
    .select("*")
    .order("sort_name");

  if (error) throw error;
  return data;
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
    members: membersResult.data || [],
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
    member,
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
    leader = data;
  }

  // Get all group members with member details
  const { data: groupMembers } = await supabase
    .from("community_group_members")
    .select("member_id, members(*)")
    .eq("group_id", id);

  return {
    group,
    leader,
    members: groupMembers?.map((gm) => gm.members).filter(Boolean) || [],
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
    contact = data;
  }

  // Get all ministry members with roles
  const { data: ministryMembers } = await supabase
    .from("ministry_members")
    .select("role, member_id, members(*)")
    .eq("ministry_id", id);

  return {
    ministry,
    contact,
    members: ministryMembers?.map((mm) => ({ ...mm.members, role: mm.role })).filter(Boolean) || [],
  };
}
