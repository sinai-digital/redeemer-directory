-- ================================================================
-- STEP 2: Run this AFTER you've signed up via magic link.
-- This promotes your account to super_admin.
-- ================================================================

UPDATE profiles
SET    role = 'super_admin'
WHERE  email = 'mattp91@gmail.com';
