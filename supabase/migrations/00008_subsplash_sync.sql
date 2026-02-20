-- Migration: Subsplash CSV Sync support
-- Redefines enums, adds sync keys, address columns, and sync_history table.
-- Run this in the Supabase SQL Editor (DDL can't run via REST API).

BEGIN;

-- ============================================================
-- 1. Redefine member_status enum
--    Old: 'active', 'inactive', 'visitor', 'transferred'
--    New: 'member', 'visitor', 'regular_attender', 'newcomer'
-- ============================================================

-- Drop the view that depends on members (which uses member_status)
DROP VIEW IF EXISTS directory_members_view;

-- Create new enum
CREATE TYPE member_status_new AS ENUM ('member', 'visitor', 'regular_attender', 'newcomer');

-- Alter column: cast to text, update values, cast to new enum
ALTER TABLE members ALTER COLUMN member_status DROP DEFAULT;
ALTER TABLE members ALTER COLUMN member_status DROP NOT NULL;
ALTER TABLE members ALTER COLUMN member_status TYPE text USING member_status::text;

-- Map old values to new (best-effort)
UPDATE members SET member_status = CASE member_status
    WHEN 'active'      THEN 'member'
    WHEN 'visitor'     THEN 'visitor'
    WHEN 'inactive'    THEN NULL
    WHEN 'transferred' THEN NULL
    ELSE NULL
END;

ALTER TABLE members ALTER COLUMN member_status TYPE member_status_new USING member_status::member_status_new;

-- Drop old, rename new
DROP TYPE member_status;
ALTER TYPE member_status_new RENAME TO member_status;


-- ============================================================
-- 2. Redefine family_role enum
--    Old: 'head', 'spouse', 'child', 'other'
--    New: 'parent', 'child'
-- ============================================================

CREATE TYPE family_role_new AS ENUM ('parent', 'child');

ALTER TABLE members ALTER COLUMN family_role DROP DEFAULT;
ALTER TABLE members ALTER COLUMN family_role DROP NOT NULL;
ALTER TABLE members ALTER COLUMN family_role TYPE text USING family_role::text;

-- Map old values to new
UPDATE members SET family_role = CASE family_role
    WHEN 'head'   THEN 'parent'
    WHEN 'spouse'  THEN 'parent'
    WHEN 'child'   THEN 'child'
    WHEN 'other'   THEN NULL
    ELSE NULL
END;

ALTER TABLE members ALTER COLUMN family_role TYPE family_role_new USING family_role::family_role_new;

DROP TYPE family_role;
ALTER TYPE family_role_new RENAME TO family_role;


-- ============================================================
-- 3. Make family_id nullable (members without a household)
-- ============================================================

ALTER TABLE members ALTER COLUMN family_id DROP NOT NULL;


-- ============================================================
-- 4. Add Subsplash sync keys
-- ============================================================

ALTER TABLE members  ADD COLUMN subsplash_person_id    uuid UNIQUE;
ALTER TABLE families ADD COLUMN subsplash_household_id uuid UNIQUE;


-- ============================================================
-- 5. Add address columns to members (for members without families)
-- ============================================================

ALTER TABLE members ADD COLUMN address text;
ALTER TABLE members ADD COLUMN city    text;
ALTER TABLE members ADD COLUMN state   text;
ALTER TABLE members ADD COLUMN zip     text;


-- ============================================================
-- 6. Add additional Subsplash fields to members
-- ============================================================

ALTER TABLE members ADD COLUMN marital_status          text;
ALTER TABLE members ADD COLUMN membership_status_date  date;
ALTER TABLE members ADD COLUMN baptism_date            date;
ALTER TABLE members ADD COLUMN allergy_notes           text;
ALTER TABLE members ADD COLUMN care_notes              text;
ALTER TABLE members ADD COLUMN grade_level             text;
ALTER TABLE members ADD COLUMN graduation_year         int;


-- ============================================================
-- 7. Recreate directory_members_view with LEFT JOIN + COALESCE
-- ============================================================

CREATE VIEW directory_members_view AS
SELECT
    m.*,
    f.family_name,
    f.display_name        AS family_display_name,
    COALESCE(m.address, f.address)  AS family_address,
    COALESCE(m.city,    f.city)     AS family_city,
    COALESCE(m.state,   f.state)    AS family_state,
    COALESCE(m.zip,     f.zip)      AS family_zip,
    f.phone               AS family_phone,
    f.email               AS family_email
FROM members  m
LEFT JOIN families f ON m.family_id = f.id;


-- ============================================================
-- 8. Create sync_history table
-- ============================================================

CREATE TABLE sync_history (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    performed_by    uuid        REFERENCES profiles,
    performed_at    timestamptz NOT NULL DEFAULT now(),
    csv_filename    text        NOT NULL,
    csv_row_count   int         NOT NULL,
    summary         jsonb       NOT NULL DEFAULT '{}',
    snapshot_before jsonb       NOT NULL DEFAULT '{}',
    rolled_back_at  timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now()
);

-- RLS: admin-only access
ALTER TABLE sync_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything on sync_history"
    ON sync_history
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'super_admin')
        )
    );


-- ============================================================
-- 9. Indexes for new columns
-- ============================================================

CREATE INDEX idx_members_subsplash_person_id     ON members  (subsplash_person_id)    WHERE subsplash_person_id IS NOT NULL;
CREATE INDEX idx_families_subsplash_household_id ON families (subsplash_household_id) WHERE subsplash_household_id IS NOT NULL;

COMMIT;
