-- Add invite tracking to auth_allowlist
-- Run this in the Supabase SQL Editor before using the invite feature.

ALTER TABLE auth_allowlist ADD COLUMN IF NOT EXISTS invite_sent_at timestamptz;
