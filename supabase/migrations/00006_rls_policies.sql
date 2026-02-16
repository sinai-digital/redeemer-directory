-- Row-Level Security policies.
-- RLS is enabled on every table; policies default-deny when no rule matches.

-- ============================================================
-- auth_allowlist
-- ============================================================
ALTER TABLE auth_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_allowlist: admin select"
    ON auth_allowlist FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "auth_allowlist: admin insert"
    ON auth_allowlist FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "auth_allowlist: admin update"
    ON auth_allowlist FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "auth_allowlist: admin delete"
    ON auth_allowlist FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- profiles
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: authenticated select"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "profiles: own or admin update"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id OR is_admin())
    WITH CHECK (auth.uid() = id OR is_admin());


-- ============================================================
-- families
-- ============================================================
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

CREATE POLICY "families: authenticated select"
    ON families FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "families: admin insert"
    ON families FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "families: admin update"
    ON families FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "families: admin delete"
    ON families FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- members
-- ============================================================
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members: authenticated select"
    ON members FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "members: own or admin update"
    ON members FOR UPDATE
    TO authenticated
    USING (profile_id = auth.uid() OR is_admin())
    WITH CHECK (profile_id = auth.uid() OR is_admin());

CREATE POLICY "members: admin insert"
    ON members FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "members: admin delete"
    ON members FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- community_groups
-- ============================================================
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_groups: authenticated select"
    ON community_groups FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "community_groups: admin insert"
    ON community_groups FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "community_groups: admin update"
    ON community_groups FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "community_groups: admin delete"
    ON community_groups FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- community_group_members
-- ============================================================
ALTER TABLE community_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_group_members: authenticated select"
    ON community_group_members FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "community_group_members: admin insert"
    ON community_group_members FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "community_group_members: admin update"
    ON community_group_members FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "community_group_members: admin delete"
    ON community_group_members FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- ministries
-- ============================================================
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ministries: authenticated select"
    ON ministries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "ministries: admin insert"
    ON ministries FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "ministries: admin update"
    ON ministries FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "ministries: admin delete"
    ON ministries FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- ministry_members
-- ============================================================
ALTER TABLE ministry_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ministry_members: authenticated select"
    ON ministry_members FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "ministry_members: admin insert"
    ON ministry_members FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "ministry_members: admin update"
    ON ministry_members FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "ministry_members: admin delete"
    ON ministry_members FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- forum_categories
-- ============================================================
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_categories: authenticated select"
    ON forum_categories FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "forum_categories: admin insert"
    ON forum_categories FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "forum_categories: admin update"
    ON forum_categories FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "forum_categories: admin delete"
    ON forum_categories FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- forum_posts
-- ============================================================
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_posts: visible select"
    ON forum_posts FOR SELECT
    TO authenticated
    USING (
        status = 'published'
        OR author_id = auth.uid()
        OR is_moderator()
    );

CREATE POLICY "forum_posts: author insert"
    ON forum_posts FOR INSERT
    TO authenticated
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "forum_posts: author or moderator update"
    ON forum_posts FOR UPDATE
    TO authenticated
    USING (author_id = auth.uid() OR is_moderator())
    WITH CHECK (author_id = auth.uid() OR is_moderator());

CREATE POLICY "forum_posts: admin delete"
    ON forum_posts FOR DELETE
    TO authenticated
    USING (is_admin());


-- ============================================================
-- forum_comments
-- ============================================================
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_comments: visible select"
    ON forum_comments FOR SELECT
    TO authenticated
    USING (
        is_removed = false
        OR author_id = auth.uid()
        OR is_moderator()
    );

CREATE POLICY "forum_comments: author insert"
    ON forum_comments FOR INSERT
    TO authenticated
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "forum_comments: author or moderator update"
    ON forum_comments FOR UPDATE
    TO authenticated
    USING (author_id = auth.uid() OR is_moderator())
    WITH CHECK (author_id = auth.uid() OR is_moderator());


-- ============================================================
-- forum_reactions
-- ============================================================
ALTER TABLE forum_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_reactions: authenticated select"
    ON forum_reactions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "forum_reactions: own insert"
    ON forum_reactions FOR INSERT
    TO authenticated
    WITH CHECK (profile_id = auth.uid());

CREATE POLICY "forum_reactions: own delete"
    ON forum_reactions FOR DELETE
    TO authenticated
    USING (profile_id = auth.uid());
