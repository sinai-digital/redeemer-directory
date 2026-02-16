-- ==========================================================================
-- Redeemer Church Directory – Seed Data
-- Generated on 2026-02-16T02:07:00.561Z
-- Run with: psql $DATABASE_URL < supabase/seed.sql
-- ==========================================================================

BEGIN;

-- --------------------------------------------------------------------------
-- auth_allowlist
-- --------------------------------------------------------------------------
INSERT INTO auth_allowlist (email) VALUES ('matt.pike@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('sarah.pike@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('greg.swartz@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('linda.swartz@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('brian.mccarthy@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('karen.mccarthy@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('robert.henderson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('patricia.henderson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('david.nguyen@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('mai.nguyen@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('carlos.rivera@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('maria.rivera@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('james.thompson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('angela.thompson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('marcus.williams@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('denise.williams@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('daniel.kim@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('grace.kim@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('william.davis@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('barbara.davis@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('miguel.garcia@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('elena.garcia@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('thomas.mitchell@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('rachel.mitchell@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('raj.patel@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('priya.patel@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('kevin.robinson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('sharon.robinson@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('andrew.carter@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('jessica.carter@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('steven.foster@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('dorothy.foster@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('christopher.brooks@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('amanda.brooks@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('richard.sanders@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('lisa.sanders@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('derek.coleman@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('megan.coleman@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('antonio.torres@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('carmen.torres@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('paul.jenkins@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('nancy.jenkins@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('jason.morgan@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('heather.morgan@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('timothy.bell@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('christine.bell@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('scott.reed@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('kimberly.reed@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('luis.ortiz@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('ana.ortiz@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('sean.murphy@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('colleen.murphy@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('raymond.hayes@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('martha.hayes@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('kenneth.wallace@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('tamara.wallace@example.com') ON CONFLICT DO NOTHING;
INSERT INTO auth_allowlist (email) VALUES ('michael.davis@example.com') ON CONFLICT DO NOTHING;

-- --------------------------------------------------------------------------
-- families
-- --------------------------------------------------------------------------
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('3028de5b-1392-43b7-ab60-8f7d9b3e79e0', 'Pike', 'The Pike Family', '2410 Boyette Rd', 'Riverview', 'FL', '33569', '813-555-0101', 'pike@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('3e36af27-731d-479f-a63d-01ce83a0a710', 'Swartz', 'The Swartz Family', '456 Boyette Rd', 'Riverview', 'FL', '33569', '813-555-0102', 'swartz@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('1a733858-3087-4ead-a325-13539b044e4a', 'McCarthy', 'The McCarthy Family', '789 Providence Rd', 'Riverview', 'FL', '33578', '813-555-0103', 'mccarthy@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('b153a279-6afc-46aa-a769-336257243970', 'Henderson', 'The Henderson Family', '321 Bloomingdale Ave', 'Riverview', 'FL', '33578', '813-555-0104', 'henderson@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('1c5f0998-961d-41b4-a56d-24f4ecaaf505', 'Nguyen', 'The Nguyen Family', '1520 Balm Riverview Rd', 'Riverview', 'FL', '33569', '813-555-0105', 'nguyen@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('dfbfe791-3708-4be9-aa29-c8e016d80209', 'Rivera', 'The Rivera Family', '3305 Bloomingdale Ave', 'Riverview', 'FL', '33578', '813-555-0106', 'rivera@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('6ddbc527-9692-4835-a50f-61f572e71d37', 'Thompson', 'The Thompson Family', '8712 Providence Rd', 'Riverview', 'FL', '33579', '813-555-0107', 'thompson@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('18e79fba-6276-4c52-a2e9-bd97fae1469a', 'Williams', 'The Williams Family', '1045 Boyette Rd', 'Riverview', 'FL', '33569', '813-555-0108', 'williams@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('9ddb496f-8596-411c-a658-384def37010a', 'Kim', 'The Kim Family', '5614 Balm Riverview Rd', 'Riverview', 'FL', '33579', '813-555-0109', 'kim@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('cc2277ae-e0bc-451e-ad4f-fad3b31dce43', 'Davis', 'The Davis Family', '2200 Providence Rd', 'Riverview', 'FL', '33578', '813-555-0110', 'davis@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('56d66033-b7a8-47f5-a9ee-931e5d50faa0', 'Garcia', 'The Garcia Family', '4489 Boyette Rd', 'Riverview', 'FL', '33569', '813-555-0111', 'garcia@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('1e4e0610-52fe-43d8-ac39-9961f88c1769', 'Mitchell', 'The Mitchell Family', '1876 Bloomingdale Ave', 'Riverview', 'FL', '33578', '813-555-0112', 'mitchell@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('06b078d6-659c-4c58-ae26-b1ee5f533b86', 'Patel', 'The Patel Family', '6230 Balm Riverview Rd', 'Riverview', 'FL', '33579', '813-555-0113', 'patel@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('3043d62c-f8de-4eb3-a5b0-e898c203590f', 'Robinson', 'The Robinson Family', '3105 Providence Rd', 'Riverview', 'FL', '33569', '813-555-0114', 'robinson@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('b7d86afd-5972-46d6-a164-d43fea27a1c3', 'Carter', 'The Carter Family', '7421 Boyette Rd', 'Riverview', 'FL', '33578', '813-555-0115', 'carter@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('6a4cc42c-2ac4-42d4-a05f-3d07a6cfa59f', 'Foster', 'The Foster Family', '950 Bloomingdale Ave', 'Riverview', 'FL', '33579', '813-555-0116', 'foster@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('e3f3abc3-cf18-4733-a7b7-d3c4430cf2d6', 'Brooks', 'The Brooks Family', '2780 Balm Riverview Rd', 'Riverview', 'FL', '33569', '813-555-0117', 'brooks@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('2cf633f4-3cf5-4433-af68-de9d7b663720', 'Sanders', 'The Sanders Family', '4102 Providence Rd', 'Riverview', 'FL', '33578', '813-555-0118', 'sanders@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('0c5a6112-b218-4887-a8d9-fa3702e24acf', 'Coleman', 'The Coleman Family', '1633 Boyette Rd', 'Riverview', 'FL', '33579', '813-555-0119', 'coleman@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('f79478a1-635a-4350-a994-2ed8aa13addb', 'Torres', 'The Torres Family', '5290 Bloomingdale Ave', 'Riverview', 'FL', '33569', '813-555-0120', 'torres@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('28b0ce1d-0688-4f65-ae29-b7037d01e5c1', 'Jenkins', 'The Jenkins Family', '3847 Balm Riverview Rd', 'Riverview', 'FL', '33578', '813-555-0121', 'jenkins@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('ee0d8556-94c7-4fdb-aa6b-29066df5d4f4', 'Morgan', 'The Morgan Family', '6115 Providence Rd', 'Riverview', 'FL', '33579', '813-555-0122', 'morgan@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('47ae3975-b0b8-4e74-a245-edc93e911b52', 'Bell', 'The Bell Family', '1290 Boyette Rd', 'Riverview', 'FL', '33569', '813-555-0123', 'bell@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('1da7cf73-d92a-444f-a43b-a64d2ec57be9', 'Reed', 'The Reed Family', '4560 Bloomingdale Ave', 'Riverview', 'FL', '33578', '813-555-0124', 'reed@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('3d268081-4c1d-4cb3-a705-8c7d0b3b8c71', 'Ortiz', 'The Ortiz Family', '8320 Balm Riverview Rd', 'Riverview', 'FL', '33579', '813-555-0125', 'ortiz@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('82ed6e89-a86a-452b-a8a4-393cf5e13f95', 'Murphy', 'The Murphy Family', '2955 Providence Rd', 'Riverview', 'FL', '33569', '813-555-0126', 'murphy@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('1be32115-4353-443e-aa91-a17701f02a80', 'Hayes', 'The Hayes Family', '5478 Boyette Rd', 'Riverview', 'FL', '33578', '813-555-0127', 'hayes@example.com');
INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES ('9aeee41a-e00b-4656-aee5-36f2323bf3c2', 'Wallace', 'The Wallace Family', '7034 Bloomingdale Ave', 'Riverview', 'FL', '33579', '813-555-0128', 'wallace@example.com');

-- --------------------------------------------------------------------------
-- members
-- --------------------------------------------------------------------------
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('161b392f-d0cb-4760-a2ce-caaeb14ad3f9', '3028de5b-1392-43b7-ab60-8f7d9b3e79e0', 'head', 'Matt', 'Pike', 'matt.pike@example.com', '813-555-0101', '1985-06-12', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('e511c049-2b85-48b8-aa49-81f2ab18f75c', '3028de5b-1392-43b7-ab60-8f7d9b3e79e0', 'spouse', 'Sarah', 'Pike', 'sarah.pike@example.com', '813-555-0201', '1987-09-23', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('702bd17f-7e67-403b-a042-967bd7cebb8e', '3028de5b-1392-43b7-ab60-8f7d9b3e79e0', 'child', 'Ethan', 'Pike', NULL, NULL, '2015-03-05', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('08bd1feb-3d2a-4bbd-a9fe-4081c6939359', '3e36af27-731d-479f-a63d-01ce83a0a710', 'head', 'Greg', 'Swartz', 'greg.swartz@example.com', '813-555-0102', '1978-11-30', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6209c170-ab70-4f5d-a830-04941e7109c1', '3e36af27-731d-479f-a63d-01ce83a0a710', 'spouse', 'Linda', 'Swartz', 'linda.swartz@example.com', '813-555-0202', '1980-04-18', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6014538f-84b6-4917-a870-2f365ac4ea61', '3e36af27-731d-479f-a63d-01ce83a0a710', 'child', 'Tyler', 'Swartz', NULL, NULL, '2008-07-14', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6acaa649-859d-4df4-a197-1cb1a3f767c2', '1a733858-3087-4ead-a325-13539b044e4a', 'head', 'Brian', 'McCarthy', 'brian.mccarthy@example.com', '813-555-0103', '1975-02-28', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('10c08eb8-1a54-406c-a9f9-dfaa930e3580', '1a733858-3087-4ead-a325-13539b044e4a', 'spouse', 'Karen', 'McCarthy', 'karen.mccarthy@example.com', '813-555-0203', '1977-08-09', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d7a24245-048d-41c8-a9c1-b95f3e7a5490', '1a733858-3087-4ead-a325-13539b044e4a', 'child', 'Aiden', 'McCarthy', NULL, NULL, '2012-01-22', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('ddac797e-398d-4e76-ae6e-374ac08872aa', 'b153a279-6afc-46aa-a769-336257243970', 'head', 'Robert', 'Henderson', 'robert.henderson@example.com', '813-555-0104', '1972-05-15', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d1d87b29-7420-45e8-ad98-025cfc3943e7', 'b153a279-6afc-46aa-a769-336257243970', 'spouse', 'Patricia', 'Henderson', 'patricia.henderson@example.com', '813-555-0204', '1974-12-03', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('9f80a4c5-3140-4fd0-aa40-5ff512a8975e', '1c5f0998-961d-41b4-a56d-24f4ecaaf505', 'head', 'David', 'Nguyen', 'david.nguyen@example.com', '813-555-0105', '1983-10-07', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('dcf8d1bf-3809-4823-afe7-a6341811c429', '1c5f0998-961d-41b4-a56d-24f4ecaaf505', 'spouse', 'Mai', 'Nguyen', 'mai.nguyen@example.com', '813-555-0205', '1985-03-21', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6f75ed09-6bdb-4b40-a5df-57b1451ac856', '1c5f0998-961d-41b4-a56d-24f4ecaaf505', 'child', 'Lily', 'Nguyen', NULL, NULL, '2016-11-12', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('db94a381-17b6-4670-ac85-0c2a3e320487', 'dfbfe791-3708-4be9-aa29-c8e016d80209', 'head', 'Carlos', 'Rivera', 'carlos.rivera@example.com', '813-555-0106', '1980-07-25', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('4e5d6c3e-9008-4d3e-af43-3e529a4f5d16', 'dfbfe791-3708-4be9-aa29-c8e016d80209', 'spouse', 'Maria', 'Rivera', 'maria.rivera@example.com', '813-555-0206', '1982-01-14', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('c8edd712-0714-44d9-a755-3b72cbe0eb58', 'dfbfe791-3708-4be9-aa29-c8e016d80209', 'child', 'Sofia', 'Rivera', NULL, NULL, '2013-09-30', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('2d416e14-7c44-4db7-a183-9b115f01ed6e', '6ddbc527-9692-4835-a50f-61f572e71d37', 'head', 'James', 'Thompson', 'james.thompson@example.com', '813-555-0107', '1976-04-11', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('f4364626-8792-4a31-ab48-291048ac41be', '6ddbc527-9692-4835-a50f-61f572e71d37', 'spouse', 'Angela', 'Thompson', 'angela.thompson@example.com', '813-555-0207', '1978-08-27', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('5721a5da-484c-4ecd-aa26-7f61607b5325', '6ddbc527-9692-4835-a50f-61f572e71d37', 'child', 'Noah', 'Thompson', NULL, NULL, '2010-02-19', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('235e8068-cbec-4af1-a8e9-995750db883e', '18e79fba-6276-4c52-a2e9-bd97fae1469a', 'head', 'Marcus', 'Williams', 'marcus.williams@example.com', '813-555-0108', '1981-12-05', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('ef6e3e73-8cce-469d-aeac-4f51efc6189f', '18e79fba-6276-4c52-a2e9-bd97fae1469a', 'spouse', 'Denise', 'Williams', 'denise.williams@example.com', '813-555-0208', '1983-06-17', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6b71062c-7689-4224-a7f2-beb3f25303ee', '9ddb496f-8596-411c-a658-384def37010a', 'head', 'Daniel', 'Kim', 'daniel.kim@example.com', '813-555-0109', '1979-09-08', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('eaff4c1b-ec32-4507-aa38-bc34ba081bae', '9ddb496f-8596-411c-a658-384def37010a', 'spouse', 'Grace', 'Kim', 'grace.kim@example.com', '813-555-0209', '1981-11-29', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('83caded1-f8b4-4b0d-a968-0e9ec3faa55b', '9ddb496f-8596-411c-a658-384def37010a', 'child', 'Hannah', 'Kim', NULL, NULL, '2011-05-16', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('0cc184d8-668d-45a6-a37c-b907cddd77f5', 'cc2277ae-e0bc-451e-ad4f-fad3b31dce43', 'head', 'William', 'Davis', 'william.davis@example.com', '813-555-0110', '1970-03-22', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('07b18d8f-da6d-424b-a92c-bb10d0a6ddb0', 'cc2277ae-e0bc-451e-ad4f-fad3b31dce43', 'spouse', 'Barbara', 'Davis', 'barbara.davis@example.com', '813-555-0210', '1972-07-10', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('0a227a2a-df5b-4010-a1e3-604c549b940c', '56d66033-b7a8-47f5-a9ee-931e5d50faa0', 'head', 'Miguel', 'Garcia', 'miguel.garcia@example.com', '813-555-0111', '1984-01-19', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('4020f5ed-6c4e-4cd9-a92d-cf34448aa032', '56d66033-b7a8-47f5-a9ee-931e5d50faa0', 'spouse', 'Elena', 'Garcia', 'elena.garcia@example.com', '813-555-0211', '1986-05-04', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('2203205a-945c-4c5d-ab90-e11a3b20c1ca', '56d66033-b7a8-47f5-a9ee-931e5d50faa0', 'child', 'Isabella', 'Garcia', NULL, NULL, '2014-10-08', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('e5ff0fdb-3969-4641-a5a4-e185a3e64a96', '1e4e0610-52fe-43d8-ac39-9961f88c1769', 'head', 'Thomas', 'Mitchell', 'thomas.mitchell@example.com', '813-555-0112', '1977-06-28', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a', '1e4e0610-52fe-43d8-ac39-9961f88c1769', 'spouse', 'Rachel', 'Mitchell', 'rachel.mitchell@example.com', '813-555-0212', '1979-10-15', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('741bc6aa-de7e-4020-aff2-bd5c1f29d481', '06b078d6-659c-4c58-ae26-b1ee5f533b86', 'head', 'Raj', 'Patel', 'raj.patel@example.com', '813-555-0113', '1982-08-14', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d64de394-127e-4efd-ab49-8ad2433d84a4', '06b078d6-659c-4c58-ae26-b1ee5f533b86', 'spouse', 'Priya', 'Patel', 'priya.patel@example.com', '813-555-0213', '1984-02-26', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('7d6bfe60-a810-4503-a49d-30f7e2e6d495', '06b078d6-659c-4c58-ae26-b1ee5f533b86', 'child', 'Arjun', 'Patel', NULL, NULL, '2017-04-03', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', '3043d62c-f8de-4eb3-a5b0-e898c203590f', 'head', 'Kevin', 'Robinson', 'kevin.robinson@example.com', '813-555-0114', '1973-11-20', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('972bf66e-9b51-42e5-ac75-1c848969b415', '3043d62c-f8de-4eb3-a5b0-e898c203590f', 'spouse', 'Sharon', 'Robinson', 'sharon.robinson@example.com', '813-555-0214', '1975-05-08', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('4d2fff98-eec8-4f9c-aa8b-cf423596d735', 'b7d86afd-5972-46d6-a164-d43fea27a1c3', 'head', 'Andrew', 'Carter', 'andrew.carter@example.com', '813-555-0115', '1986-09-16', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d653fb54-031a-45a2-a4be-5415d4a0b1d8', 'b7d86afd-5972-46d6-a164-d43fea27a1c3', 'spouse', 'Jessica', 'Carter', 'jessica.carter@example.com', '813-555-0215', '1988-03-02', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('c6978409-77d6-44f1-ac9a-a3163d6a8b59', 'b7d86afd-5972-46d6-a164-d43fea27a1c3', 'child', 'Caleb', 'Carter', NULL, NULL, '2018-07-21', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('5080efae-64e8-468d-a070-36d94a74879c', '6a4cc42c-2ac4-42d4-a05f-3d07a6cfa59f', 'head', 'Steven', 'Foster', 'steven.foster@example.com', '813-555-0116', '1969-04-30', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('b48f6988-3104-4f5f-aaed-499de0c7cfa7', '6a4cc42c-2ac4-42d4-a05f-3d07a6cfa59f', 'spouse', 'Dorothy', 'Foster', 'dorothy.foster@example.com', '813-555-0216', '1971-08-12', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('bc194bf3-0abb-435f-a266-022975321ba0', 'e3f3abc3-cf18-4733-a7b7-d3c4430cf2d6', 'head', 'Christopher', 'Brooks', 'christopher.brooks@example.com', '813-555-0117', '1988-02-14', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('3602dfc9-caa4-481b-a2c5-061764f91d3f', 'e3f3abc3-cf18-4733-a7b7-d3c4430cf2d6', 'spouse', 'Amanda', 'Brooks', 'amanda.brooks@example.com', '813-555-0217', '1990-06-29', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('47d01231-82e7-4cac-ab9f-b71864244d85', 'e3f3abc3-cf18-4733-a7b7-d3c4430cf2d6', 'child', 'Emma', 'Brooks', NULL, NULL, '2019-12-10', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('21a42f19-7c2b-4490-a3d4-9f88484d4907', '2cf633f4-3cf5-4433-af68-de9d7b663720', 'head', 'Richard', 'Sanders', 'richard.sanders@example.com', '813-555-0118', '1974-10-05', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('e6ce9767-5553-40c3-a06a-8bf07bb2fadd', '2cf633f4-3cf5-4433-af68-de9d7b663720', 'spouse', 'Lisa', 'Sanders', 'lisa.sanders@example.com', '813-555-0218', '1976-03-17', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('9013451b-04a7-4791-a32f-608b5f9f0c94', '0c5a6112-b218-4887-a8d9-fa3702e24acf', 'head', 'Derek', 'Coleman', 'derek.coleman@example.com', '813-555-0119', '1987-07-08', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('116520f9-7c8c-41b3-ab92-1eadcc006998', '0c5a6112-b218-4887-a8d9-fa3702e24acf', 'spouse', 'Megan', 'Coleman', 'megan.coleman@example.com', '813-555-0219', '1989-11-25', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('6dfb53ca-6748-44d1-a353-6676fbcb4568', '0c5a6112-b218-4887-a8d9-fa3702e24acf', 'child', 'Lucas', 'Coleman', NULL, NULL, '2020-05-14', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('36317dc6-fa68-4bb5-aed1-e51cbf7d1003', 'f79478a1-635a-4350-a994-2ed8aa13addb', 'head', 'Antonio', 'Torres', 'antonio.torres@example.com', '813-555-0120', '1981-06-03', 'male', 'visitor');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('76c27131-0033-454a-a640-94da64f653b5', 'f79478a1-635a-4350-a994-2ed8aa13addb', 'spouse', 'Carmen', 'Torres', 'carmen.torres@example.com', '813-555-0220', '1983-09-19', 'female', 'visitor');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d405c4e6-5e8d-4ece-ac25-1531a369b561', '28b0ce1d-0688-4f65-ae29-b7037d01e5c1', 'head', 'Paul', 'Jenkins', 'paul.jenkins@example.com', '813-555-0121', '1971-01-27', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('b79447cc-99ed-43de-a932-4510f745ebd0', '28b0ce1d-0688-4f65-ae29-b7037d01e5c1', 'spouse', 'Nancy', 'Jenkins', 'nancy.jenkins@example.com', '813-555-0221', '1973-05-11', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('29937a53-3e0b-47a8-a705-449317199717', 'ee0d8556-94c7-4fdb-aa6b-29066df5d4f4', 'head', 'Jason', 'Morgan', 'jason.morgan@example.com', '813-555-0122', '1985-08-20', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('722d5bdd-f5e2-4189-a3f3-775fc5443380', 'ee0d8556-94c7-4fdb-aa6b-29066df5d4f4', 'spouse', 'Heather', 'Morgan', 'heather.morgan@example.com', '813-555-0222', '1987-12-06', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('8edc54c0-84e4-462b-a8b9-0db964798494', 'ee0d8556-94c7-4fdb-aa6b-29066df5d4f4', 'child', 'Owen', 'Morgan', NULL, NULL, '2015-09-18', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('1346cd02-dd1c-49fe-a466-608615022b50', '47ae3975-b0b8-4e74-a245-edc93e911b52', 'head', 'Timothy', 'Bell', 'timothy.bell@example.com', '813-555-0123', '1979-03-09', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('55b5c086-1085-45b6-a96c-99b925b78580', '47ae3975-b0b8-4e74-a245-edc93e911b52', 'spouse', 'Christine', 'Bell', 'christine.bell@example.com', '813-555-0223', '1981-07-24', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('72fcd57c-83f3-408b-ae8c-e09ed4481cd4', '1da7cf73-d92a-444f-a43b-a64d2ec57be9', 'head', 'Scott', 'Reed', 'scott.reed@example.com', '813-555-0124', '1983-11-13', 'male', 'inactive');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('d1dcc124-3073-4585-a404-c08fa55d4ce8', '1da7cf73-d92a-444f-a43b-a64d2ec57be9', 'spouse', 'Kimberly', 'Reed', 'kimberly.reed@example.com', '813-555-0224', '1985-04-07', 'female', 'inactive');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('827aedb3-2edb-4d63-a8ae-d8e6cb432646', '3d268081-4c1d-4cb3-a705-8c7d0b3b8c71', 'head', 'Luis', 'Ortiz', 'luis.ortiz@example.com', '813-555-0125', '1990-02-18', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('342e74ac-7f5b-403b-a02d-7c94da6d0f75', '3d268081-4c1d-4cb3-a705-8c7d0b3b8c71', 'spouse', 'Ana', 'Ortiz', 'ana.ortiz@example.com', '813-555-0225', '1991-06-30', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('a77a914e-ceb8-4a33-aef9-35775117d6fa', '82ed6e89-a86a-452b-a8a4-393cf5e13f95', 'head', 'Sean', 'Murphy', 'sean.murphy@example.com', '813-555-0126', '1976-09-02', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('1dbbb53d-04cf-4aee-a649-dae0f396c4a1', '82ed6e89-a86a-452b-a8a4-393cf5e13f95', 'spouse', 'Colleen', 'Murphy', 'colleen.murphy@example.com', '813-555-0226', '1978-12-18', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('de322af7-8472-4546-a2ad-3c1ab82aace0', '82ed6e89-a86a-452b-a8a4-393cf5e13f95', 'child', 'Liam', 'Murphy', NULL, NULL, '2009-08-25', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('4b7769cc-d57b-4a66-a539-30b438d51d0c', '1be32115-4353-443e-aa91-a17701f02a80', 'head', 'Raymond', 'Hayes', 'raymond.hayes@example.com', '813-555-0127', '1968-07-16', 'male', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('20bce764-55a7-4ecc-ae09-4cb9ee5d4c37', '1be32115-4353-443e-aa91-a17701f02a80', 'spouse', 'Martha', 'Hayes', 'martha.hayes@example.com', '813-555-0227', '1970-11-04', 'female', 'active');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('1fe49ad0-2623-4ba1-a4de-8ab007b7c0db', '9aeee41a-e00b-4656-aee5-36f2323bf3c2', 'head', 'Kenneth', 'Wallace', 'kenneth.wallace@example.com', '813-555-0128', '1982-04-22', 'male', 'visitor');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('04f74c00-7457-4236-ab48-f3ac5ea5052e', '9aeee41a-e00b-4656-aee5-36f2323bf3c2', 'spouse', 'Tamara', 'Wallace', 'tamara.wallace@example.com', '813-555-0228', '1984-08-09', 'female', 'visitor');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('b411bc10-f91e-4e7f-ad3a-c28020cc6d6d', '9aeee41a-e00b-4656-aee5-36f2323bf3c2', 'child', 'Zoe', 'Wallace', NULL, NULL, '2016-02-28', 'female', 'visitor');
INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES ('84b386bd-9d51-4be6-a5d4-9be56bb4a774', 'cc2277ae-e0bc-451e-ad4f-fad3b31dce43', 'child', 'Michael', 'Davis', 'michael.davis@example.com', '813-555-0310', '2000-09-12', 'male', 'active');

-- --------------------------------------------------------------------------
-- community_groups
-- --------------------------------------------------------------------------
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', 'Swartz Home Group', 'A welcoming mid-week group focused on fellowship, prayer, and studying God''s Word together in the Swartz home.', 'Wednesday', '7:00 PM', 'The Swartz Home, 456 Boyette Rd', '08bd1feb-3d2a-4bbd-a9fe-4081c6939359');
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', 'McCarthy Fellowship', 'A warm Thursday evening gathering for prayer, Bible discussion, and building community in the McCarthy home.', 'Thursday', '7:00 PM', 'The McCarthy Home, 789 Providence Rd', '6acaa649-859d-4df4-a197-1cb1a3f767c2');
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', 'Boyette Road Group', 'A neighborhood group meeting in the Boyette Springs community room for Bible study and mutual encouragement.', 'Tuesday', '6:30 PM', 'Community Room, Boyette Springs', '0cc184d8-668d-45a6-a37c-b907cddd77f5');
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', 'South Shore Community Group', 'A community-focused group meeting at the South Shore Library, open to newcomers and visitors.', 'Wednesday', '6:30 PM', 'South Shore Library Meeting Room', '2d416e14-7c44-4db7-a183-9b115f01ed6e');
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'Evening Grace Group', 'A Monday evening group centered on grace-filled conversations, prayer, and studying the Scriptures together.', 'Monday', '7:30 PM', 'The Henderson Home, 321 Bloomingdale Ave', 'ddac797e-398d-4e76-ae6e-374ac08872aa');
INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', 'Brandon Bible Study', 'A Thursday evening Bible study meeting at the Brandon Community Center, focused on in-depth Scripture exploration.', 'Thursday', '6:00 PM', 'Brandon Community Center', '21a42f19-7c2b-4490-a3d4-9f88484d4907');

-- --------------------------------------------------------------------------
-- community_group_members
-- --------------------------------------------------------------------------
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '08bd1feb-3d2a-4bbd-a9fe-4081c6939359');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '6209c170-ab70-4f5d-a830-04941e7109c1');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', 'e511c049-2b85-48b8-aa49-81f2ab18f75c');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '9f80a4c5-3140-4fd0-aa40-5ff512a8975e');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', 'dcf8d1bf-3809-4823-afe7-a6341811c429');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '0a227a2a-df5b-4010-a1e3-604c549b940c');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '4020f5ed-6c4e-4cd9-a92d-cf34448aa032');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', 'bc194bf3-0abb-435f-a266-022975321ba0');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('34689114-7005-45b0-a03c-1f4425108f2f', '3602dfc9-caa4-481b-a2c5-061764f91d3f');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '6acaa649-859d-4df4-a197-1cb1a3f767c2');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '10c08eb8-1a54-406c-a9f9-dfaa930e3580');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '741bc6aa-de7e-4020-aff2-bd5c1f29d481');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', 'd64de394-127e-4efd-ab49-8ad2433d84a4');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '972bf66e-9b51-42e5-ac75-1c848969b415');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '29937a53-3e0b-47a8-a705-449317199717');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('125a7472-7cee-4885-a68d-155ef110b938', '722d5bdd-f5e2-4189-a3f3-775fc5443380');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '0cc184d8-668d-45a6-a37c-b907cddd77f5');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '07b18d8f-da6d-424b-a92c-bb10d0a6ddb0');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '235e8068-cbec-4af1-a8e9-995750db883e');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', 'ef6e3e73-8cce-469d-aeac-4f51efc6189f');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '4d2fff98-eec8-4f9c-aa8b-cf423596d735');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '1346cd02-dd1c-49fe-a466-608615022b50');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '55b5c086-1085-45b6-a96c-99b925b78580');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '827aedb3-2edb-4d63-a8ae-d8e6cb432646');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '342e74ac-7f5b-403b-a02d-7c94da6d0f75');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('5ddeeafe-74e4-4b3e-aaa9-80bcb35a7fd9', '84b386bd-9d51-4be6-a5d4-9be56bb4a774');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '2d416e14-7c44-4db7-a183-9b115f01ed6e');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', 'f4364626-8792-4a31-ab48-291048ac41be');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', 'db94a381-17b6-4670-ac85-0c2a3e320487');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '4e5d6c3e-9008-4d3e-af43-3e529a4f5d16');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '9013451b-04a7-4791-a32f-608b5f9f0c94');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '116520f9-7c8c-41b3-ab92-1eadcc006998');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', 'a77a914e-ceb8-4a33-aef9-35775117d6fa');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '1dbbb53d-04cf-4aee-a649-dae0f396c4a1');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('3cb76483-f681-4a45-a8b3-993babf43543', '36317dc6-fa68-4bb5-aed1-e51cbf7d1003');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'ddac797e-398d-4e76-ae6e-374ac08872aa');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'd1d87b29-7420-45e8-ad98-025cfc3943e7');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', '6b71062c-7689-4224-a7f2-beb3f25303ee');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', '3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', '5080efae-64e8-468d-a070-36d94a74879c');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', 'b48f6988-3104-4f5f-aaed-499de0c7cfa7');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', '4b7769cc-d57b-4a66-a539-30b438d51d0c');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('99e5b121-3707-49c0-a891-badc28bb5d8a', '20bce764-55a7-4ecc-ae09-4cb9ee5d4c37');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', '21a42f19-7c2b-4490-a3d4-9f88484d4907');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', 'd405c4e6-5e8d-4ece-ac25-1531a369b561');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', 'b79447cc-99ed-43de-a932-4510f745ebd0');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', '1fe49ad0-2623-4ba1-a4de-8ab007b7c0db');
INSERT INTO community_group_members (community_group_id, member_id) VALUES ('4ec0ddab-7592-4b37-a262-caed99bef7a7', '04f74c00-7457-4236-ab48-f3ac5ea5052e');

-- --------------------------------------------------------------------------
-- ministries
-- --------------------------------------------------------------------------
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', 'Children''s Ministry', 'Nurturing the faith of our youngest members through age-appropriate Bible lessons, activities, and fellowship.', 'education', 'e511c049-2b85-48b8-aa49-81f2ab18f75c');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', 'Youth Ministry', 'Equipping teens to grow in their faith through Bible study, mentorship, and community service.', 'education', 'bc194bf3-0abb-435f-a266-022975321ba0');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', 'Worship Team', 'Leading our congregation in worship through music, song, and creative arts each Sunday.', 'worship', '29937a53-3e0b-47a8-a705-449317199717');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', 'Food Pantry', 'Serving our neighbors in need by collecting and distributing food to families in the Riverview community.', 'outreach', 'd1d87b29-7420-45e8-ad98-025cfc3943e7');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', 'Men''s Ministry', 'Building brotherhood through Bible study, service projects, and fellowship events for men of all ages.', 'care', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'Women''s Ministry', 'Encouraging and equipping women through Bible study, mentoring, and fellowship gatherings.', 'care', '10c08eb8-1a54-406c-a9f9-dfaa930e3580');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', 'Missions Committee', 'Coordinating local and global mission efforts to spread the Gospel and serve communities in need.', 'outreach', '741bc6aa-de7e-4020-aff2-bd5c1f29d481');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('46663692-4362-40cf-ab12-43bb50183808', 'Welcome Team', 'Creating a warm and inviting atmosphere for all who walk through our doors on Sunday mornings.', 'care', 'db94a381-17b6-4670-ac85-0c2a3e320487');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', 'Deacons', 'Serving the practical and spiritual needs of our congregation through care, support, and stewardship.', 'leadership', 'ddac797e-398d-4e76-ae6e-374ac08872aa');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('d6e3b0e2-a448-47e3-a739-2b422d184fef', 'Elders', 'Providing spiritual oversight, teaching, and pastoral care for the congregation.', 'leadership', '0cc184d8-668d-45a6-a37c-b907cddd77f5');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', 'Nursery', 'Providing loving, safe care for infants and toddlers during Sunday worship services.', 'care', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8');
INSERT INTO ministries (id, name, description, category, contact_id) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'Sunday School', 'Teaching the Bible to all ages through structured classes held before the Sunday worship service.', 'education', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd');

-- --------------------------------------------------------------------------
-- ministry_members
-- --------------------------------------------------------------------------
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', 'dcf8d1bf-3809-4823-afe7-a6341811c429', 'coordinator');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', '4020f5ed-6c4e-4cd9-a92d-cf34448aa032', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', '116520f9-7c8c-41b3-ab92-1eadcc006998', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a614409d-ff6f-4c7e-a326-4e6f3b4543d2', '722d5bdd-f5e2-4189-a3f3-775fc5443380', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', 'bc194bf3-0abb-435f-a266-022975321ba0', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', '9013451b-04a7-4791-a32f-608b5f9f0c94', 'coordinator');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', '29937a53-3e0b-47a8-a705-449317199717', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', '827aedb3-2edb-4d63-a8ae-d8e6cb432646', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('443cc2ce-7e59-416c-adde-c22015758d64', '84b386bd-9d51-4be6-a5d4-9be56bb4a774', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '29937a53-3e0b-47a8-a705-449317199717', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '3602dfc9-caa4-481b-a2c5-061764f91d3f', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '6b71062c-7689-4224-a7f2-beb3f25303ee', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '827aedb3-2edb-4d63-a8ae-d8e6cb432646', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '4e5d6c3e-9008-4d3e-af43-3e529a4f5d16', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('fa9cea70-73da-475e-a514-453dc9ee4fe3', '84b386bd-9d51-4be6-a5d4-9be56bb4a774', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', 'd1d87b29-7420-45e8-ad98-025cfc3943e7', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'coordinator');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', '07b18d8f-da6d-424b-a92c-bb10d0a6ddb0', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', '972bf66e-9b51-42e5-ac75-1c848969b415', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', 'b79447cc-99ed-43de-a932-4510f745ebd0', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', '1dbbb53d-04cf-4aee-a649-dae0f396c4a1', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('9b8834e2-030e-4b26-ab36-05b25378a80d', 'b48f6988-3104-4f5f-aaed-499de0c7cfa7', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '6acaa649-859d-4df4-a197-1cb1a3f767c2', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '2d416e14-7c44-4db7-a183-9b115f01ed6e', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '21a42f19-7c2b-4490-a3d4-9f88484d4907', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', 'a77a914e-ceb8-4a33-aef9-35775117d6fa', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '0cc184d8-668d-45a6-a37c-b907cddd77f5', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('db47b6cc-176a-43f4-ae69-3459c43c049c', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'f4364626-8792-4a31-ab48-291048ac41be', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'd64de394-127e-4efd-ab49-8ad2433d84a4', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', '55b5c086-1085-45b6-a96c-99b925b78580', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('e142b092-7bc5-4981-aeb1-bf1858624655', '20bce764-55a7-4ecc-ae09-4cb9ee5d4c37', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', 'ddac797e-398d-4e76-ae6e-374ac08872aa', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', 'd405c4e6-5e8d-4ece-ac25-1531a369b561', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', '235e8068-cbec-4af1-a8e9-995750db883e', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('aabdaa88-f53f-43a5-a173-ae22b55d4dba', '1346cd02-dd1c-49fe-a466-608615022b50', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', 'db94a381-17b6-4670-ac85-0c2a3e320487', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '4e5d6c3e-9008-4d3e-af43-3e529a4f5d16', 'coordinator');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '3602dfc9-caa4-481b-a2c5-061764f91d3f', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '116520f9-7c8c-41b3-ab92-1eadcc006998', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '342e74ac-7f5b-403b-a02d-7c94da6d0f75', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', 'ef6e3e73-8cce-469d-aeac-4f51efc6189f', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '722d5bdd-f5e2-4189-a3f3-775fc5443380', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('46663692-4362-40cf-ab12-43bb50183808', '6209c170-ab70-4f5d-a830-04941e7109c1', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', 'ddac797e-398d-4e76-ae6e-374ac08872aa', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', '5080efae-64e8-468d-a070-36d94a74879c', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', 'd405c4e6-5e8d-4ece-ac25-1531a369b561', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('a1f88f9f-fc5d-4b72-a13a-810d99301e57', '4b7769cc-d57b-4a66-a539-30b438d51d0c', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('d6e3b0e2-a448-47e3-a739-2b422d184fef', '0cc184d8-668d-45a6-a37c-b907cddd77f5', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('d6e3b0e2-a448-47e3-a739-2b422d184fef', '6acaa649-859d-4df4-a197-1cb1a3f767c2', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('d6e3b0e2-a448-47e3-a739-2b422d184fef', '2d416e14-7c44-4db7-a183-9b115f01ed6e', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('d6e3b0e2-a448-47e3-a739-2b422d184fef', '21a42f19-7c2b-4490-a3d4-9f88484d4907', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', 'dcf8d1bf-3809-4823-afe7-a6341811c429', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', 'd64de394-127e-4efd-ab49-8ad2433d84a4', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', '342e74ac-7f5b-403b-a02d-7c94da6d0f75', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('2fc5e0dc-647f-4b4d-a1fa-16354fa1a21c', '4020f5ed-6c4e-4cd9-a92d-cf34448aa032', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', 'leader');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96', 'coordinator');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', '6209c170-ab70-4f5d-a830-04941e7109c1', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'd1d87b29-7420-45e8-ad98-025cfc3943e7', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'f4364626-8792-4a31-ab48-291048ac41be', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', 'b48f6988-3104-4f5f-aaed-499de0c7cfa7', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', '55b5c086-1085-45b6-a96c-99b925b78580', 'member');
INSERT INTO ministry_members (ministry_id, member_id, role) VALUES ('60995cb0-7127-4107-a4b5-63cbd6d7fbf9', '20bce764-55a7-4ecc-ae09-4cb9ee5d4c37', 'member');

-- --------------------------------------------------------------------------
-- forum_categories
-- --------------------------------------------------------------------------
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9', 'Prayer Requests', 'prayer-requests', 'Share prayer needs with our church family', 'Heart', 'rose', 1);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('e7225b77-c098-4345-afdd-5a8dac48c056', 'Announcements', 'announcements', 'Church news and updates', 'Megaphone', 'blue', 2);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('305341ab-2c48-4e53-a54b-5c092f610c7e', 'Bible Study', 'bible-study', 'Scripture discussion and study resources', 'BookOpen', 'emerald', 3);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('ad01d0ae-e02f-4c65-a30c-eede8684c08e', 'Fellowship', 'fellowship', 'Social events and gatherings', 'Users', 'purple', 4);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('ef517afa-cdf2-465a-a539-9d66876557e9', 'Serving Opportunities', 'serving-opportunities', 'Ways to serve our community', 'HandHeart', 'amber', 5);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('5d1a6c13-e80b-4eb9-a179-c0126373e05d', 'Youth & Families', 'youth-and-families', 'Resources for parents and youth', 'Baby', 'cyan', 6);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('2f8783f8-6f56-4a08-a020-a20c80f6da1b', 'Praise Reports', 'praise-reports', 'Celebrate answered prayers and blessings', 'PartyPopper', 'yellow', 7);
INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES ('6883c2c8-8c34-4beb-ad8c-b496b9dfbc72', 'General Discussion', 'general-discussion', 'Open discussion for our church community', 'MessageCircle', 'slate', 8);

-- --------------------------------------------------------------------------
-- profiles (for forum authors)
-- NOTE: We insert stub auth.users rows so the profiles FK is satisfied.
-- These are NOT real login accounts. Real users are created via sign-up.
-- --------------------------------------------------------------------------
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('10c08eb8-1a54-406c-a9f9-dfaa930e3580', '00000000-0000-0000-0000-000000000000', 'karen.mccarthy@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Karen McCarthy"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'karen.mccarthy@example.com', 'member', 'Karen McCarthy', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '10c08eb8-1a54-406c-a9f9-dfaa930e3580' WHERE id = '10c08eb8-1a54-406c-a9f9-dfaa930e3580';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('161b392f-d0cb-4760-a2ce-caaeb14ad3f9', '00000000-0000-0000-0000-000000000000', 'matt.pike@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Matt Pike"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'matt.pike@example.com', 'admin', 'Matt Pike', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '161b392f-d0cb-4760-a2ce-caaeb14ad3f9' WHERE id = '161b392f-d0cb-4760-a2ce-caaeb14ad3f9';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('eaff4c1b-ec32-4507-aa38-bc34ba081bae', '00000000-0000-0000-0000-000000000000', 'grace.kim@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Grace Kim"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('eaff4c1b-ec32-4507-aa38-bc34ba081bae', 'grace.kim@example.com', 'member', 'Grace Kim', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'eaff4c1b-ec32-4507-aa38-bc34ba081bae' WHERE id = 'eaff4c1b-ec32-4507-aa38-bc34ba081bae';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('0cc184d8-668d-45a6-a37c-b907cddd77f5', '00000000-0000-0000-0000-000000000000', 'william.davis@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"William Davis"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('0cc184d8-668d-45a6-a37c-b907cddd77f5', 'william.davis@example.com', 'member', 'William Davis', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '0cc184d8-668d-45a6-a37c-b907cddd77f5' WHERE id = '0cc184d8-668d-45a6-a37c-b907cddd77f5';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('db94a381-17b6-4670-ac85-0c2a3e320487', '00000000-0000-0000-0000-000000000000', 'carlos.rivera@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Carlos Rivera"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('db94a381-17b6-4670-ac85-0c2a3e320487', 'carlos.rivera@example.com', 'member', 'Carlos Rivera', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'db94a381-17b6-4670-ac85-0c2a3e320487' WHERE id = 'db94a381-17b6-4670-ac85-0c2a3e320487';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('d1d87b29-7420-45e8-ad98-025cfc3943e7', '00000000-0000-0000-0000-000000000000', 'patricia.henderson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Patricia Henderson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('d1d87b29-7420-45e8-ad98-025cfc3943e7', 'patricia.henderson@example.com', 'member', 'Patricia Henderson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'd1d87b29-7420-45e8-ad98-025cfc3943e7' WHERE id = 'd1d87b29-7420-45e8-ad98-025cfc3943e7';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('bc194bf3-0abb-435f-a266-022975321ba0', '00000000-0000-0000-0000-000000000000', 'christopher.brooks@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Christopher Brooks"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('bc194bf3-0abb-435f-a266-022975321ba0', 'christopher.brooks@example.com', 'member', 'Christopher Brooks', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'bc194bf3-0abb-435f-a266-022975321ba0' WHERE id = 'bc194bf3-0abb-435f-a266-022975321ba0';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('e6ce9767-5553-40c3-a06a-8bf07bb2fadd', '00000000-0000-0000-0000-000000000000', 'lisa.sanders@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Lisa Sanders"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('e6ce9767-5553-40c3-a06a-8bf07bb2fadd', 'lisa.sanders@example.com', 'member', 'Lisa Sanders', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd' WHERE id = 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('741bc6aa-de7e-4020-aff2-bd5c1f29d481', '00000000-0000-0000-0000-000000000000', 'raj.patel@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Raj Patel"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('741bc6aa-de7e-4020-aff2-bd5c1f29d481', 'raj.patel@example.com', 'member', 'Raj Patel', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '741bc6aa-de7e-4020-aff2-bd5c1f29d481' WHERE id = '741bc6aa-de7e-4020-aff2-bd5c1f29d481';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('6acaa649-859d-4df4-a197-1cb1a3f767c2', '00000000-0000-0000-0000-000000000000', 'brian.mccarthy@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Brian McCarthy"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('6acaa649-859d-4df4-a197-1cb1a3f767c2', 'brian.mccarthy@example.com', 'member', 'Brian McCarthy', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '6acaa649-859d-4df4-a197-1cb1a3f767c2' WHERE id = '6acaa649-859d-4df4-a197-1cb1a3f767c2';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('3602dfc9-caa4-481b-a2c5-061764f91d3f', '00000000-0000-0000-0000-000000000000', 'amanda.brooks@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Amanda Brooks"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('3602dfc9-caa4-481b-a2c5-061764f91d3f', 'amanda.brooks@example.com', 'member', 'Amanda Brooks', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '3602dfc9-caa4-481b-a2c5-061764f91d3f' WHERE id = '3602dfc9-caa4-481b-a2c5-061764f91d3f';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', '00000000-0000-0000-0000-000000000000', 'kevin.robinson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Kevin Robinson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', 'kevin.robinson@example.com', 'member', 'Kevin Robinson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917' WHERE id = '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('29937a53-3e0b-47a8-a705-449317199717', '00000000-0000-0000-0000-000000000000', 'jason.morgan@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Jason Morgan"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('29937a53-3e0b-47a8-a705-449317199717', 'jason.morgan@example.com', 'member', 'Jason Morgan', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '29937a53-3e0b-47a8-a705-449317199717' WHERE id = '29937a53-3e0b-47a8-a705-449317199717';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('a77a914e-ceb8-4a33-aef9-35775117d6fa', '00000000-0000-0000-0000-000000000000', 'sean.murphy@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Sean Murphy"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('a77a914e-ceb8-4a33-aef9-35775117d6fa', 'sean.murphy@example.com', 'member', 'Sean Murphy', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'a77a914e-ceb8-4a33-aef9-35775117d6fa' WHERE id = 'a77a914e-ceb8-4a33-aef9-35775117d6fa';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('e511c049-2b85-48b8-aa49-81f2ab18f75c', '00000000-0000-0000-0000-000000000000', 'sarah.pike@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Sarah Pike"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('e511c049-2b85-48b8-aa49-81f2ab18f75c', 'sarah.pike@example.com', 'member', 'Sarah Pike', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'e511c049-2b85-48b8-aa49-81f2ab18f75c' WHERE id = 'e511c049-2b85-48b8-aa49-81f2ab18f75c';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('9f80a4c5-3140-4fd0-aa40-5ff512a8975e', '00000000-0000-0000-0000-000000000000', 'david.nguyen@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"David Nguyen"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('9f80a4c5-3140-4fd0-aa40-5ff512a8975e', 'david.nguyen@example.com', 'member', 'David Nguyen', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '9f80a4c5-3140-4fd0-aa40-5ff512a8975e' WHERE id = '9f80a4c5-3140-4fd0-aa40-5ff512a8975e';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('9013451b-04a7-4791-a32f-608b5f9f0c94', '00000000-0000-0000-0000-000000000000', 'derek.coleman@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Derek Coleman"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('9013451b-04a7-4791-a32f-608b5f9f0c94', 'derek.coleman@example.com', 'member', 'Derek Coleman', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '9013451b-04a7-4791-a32f-608b5f9f0c94' WHERE id = '9013451b-04a7-4791-a32f-608b5f9f0c94';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('4b7769cc-d57b-4a66-a539-30b438d51d0c', '00000000-0000-0000-0000-000000000000', 'raymond.hayes@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Raymond Hayes"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('4b7769cc-d57b-4a66-a539-30b438d51d0c', 'raymond.hayes@example.com', 'member', 'Raymond Hayes', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '4b7769cc-d57b-4a66-a539-30b438d51d0c' WHERE id = '4b7769cc-d57b-4a66-a539-30b438d51d0c';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('d653fb54-031a-45a2-a4be-5415d4a0b1d8', '00000000-0000-0000-0000-000000000000', 'jessica.carter@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Jessica Carter"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('d653fb54-031a-45a2-a4be-5415d4a0b1d8', 'jessica.carter@example.com', 'member', 'Jessica Carter', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'd653fb54-031a-45a2-a4be-5415d4a0b1d8' WHERE id = 'd653fb54-031a-45a2-a4be-5415d4a0b1d8';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('dcf8d1bf-3809-4823-afe7-a6341811c429', '00000000-0000-0000-0000-000000000000', 'mai.nguyen@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Mai Nguyen"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('dcf8d1bf-3809-4823-afe7-a6341811c429', 'mai.nguyen@example.com', 'member', 'Mai Nguyen', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'dcf8d1bf-3809-4823-afe7-a6341811c429' WHERE id = 'dcf8d1bf-3809-4823-afe7-a6341811c429';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('4020f5ed-6c4e-4cd9-a92d-cf34448aa032', '00000000-0000-0000-0000-000000000000', 'elena.garcia@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Elena Garcia"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('4020f5ed-6c4e-4cd9-a92d-cf34448aa032', 'elena.garcia@example.com', 'member', 'Elena Garcia', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '4020f5ed-6c4e-4cd9-a92d-cf34448aa032' WHERE id = '4020f5ed-6c4e-4cd9-a92d-cf34448aa032';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('d64de394-127e-4efd-ab49-8ad2433d84a4', '00000000-0000-0000-0000-000000000000', 'priya.patel@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Priya Patel"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('d64de394-127e-4efd-ab49-8ad2433d84a4', 'priya.patel@example.com', 'member', 'Priya Patel', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'd64de394-127e-4efd-ab49-8ad2433d84a4' WHERE id = 'd64de394-127e-4efd-ab49-8ad2433d84a4';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('55b5c086-1085-45b6-a96c-99b925b78580', '00000000-0000-0000-0000-000000000000', 'christine.bell@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Christine Bell"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('55b5c086-1085-45b6-a96c-99b925b78580', 'christine.bell@example.com', 'member', 'Christine Bell', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '55b5c086-1085-45b6-a96c-99b925b78580' WHERE id = '55b5c086-1085-45b6-a96c-99b925b78580';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('21a42f19-7c2b-4490-a3d4-9f88484d4907', '00000000-0000-0000-0000-000000000000', 'richard.sanders@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Richard Sanders"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('21a42f19-7c2b-4490-a3d4-9f88484d4907', 'richard.sanders@example.com', 'member', 'Richard Sanders', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '21a42f19-7c2b-4490-a3d4-9f88484d4907' WHERE id = '21a42f19-7c2b-4490-a3d4-9f88484d4907';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('e5ff0fdb-3969-4641-a5a4-e185a3e64a96', '00000000-0000-0000-0000-000000000000', 'thomas.mitchell@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Thomas Mitchell"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('e5ff0fdb-3969-4641-a5a4-e185a3e64a96', 'thomas.mitchell@example.com', 'member', 'Thomas Mitchell', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96' WHERE id = 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('6b71062c-7689-4224-a7f2-beb3f25303ee', '00000000-0000-0000-0000-000000000000', 'daniel.kim@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Daniel Kim"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('6b71062c-7689-4224-a7f2-beb3f25303ee', 'daniel.kim@example.com', 'member', 'Daniel Kim', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '6b71062c-7689-4224-a7f2-beb3f25303ee' WHERE id = '6b71062c-7689-4224-a7f2-beb3f25303ee';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('235e8068-cbec-4af1-a8e9-995750db883e', '00000000-0000-0000-0000-000000000000', 'marcus.williams@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Marcus Williams"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('235e8068-cbec-4af1-a8e9-995750db883e', 'marcus.williams@example.com', 'member', 'Marcus Williams', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '235e8068-cbec-4af1-a8e9-995750db883e' WHERE id = '235e8068-cbec-4af1-a8e9-995750db883e';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('116520f9-7c8c-41b3-ab92-1eadcc006998', '00000000-0000-0000-0000-000000000000', 'megan.coleman@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Megan Coleman"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('116520f9-7c8c-41b3-ab92-1eadcc006998', 'megan.coleman@example.com', 'member', 'Megan Coleman', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '116520f9-7c8c-41b3-ab92-1eadcc006998' WHERE id = '116520f9-7c8c-41b3-ab92-1eadcc006998';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('827aedb3-2edb-4d63-a8ae-d8e6cb432646', '00000000-0000-0000-0000-000000000000', 'luis.ortiz@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Luis Ortiz"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('827aedb3-2edb-4d63-a8ae-d8e6cb432646', 'luis.ortiz@example.com', 'member', 'Luis Ortiz', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '827aedb3-2edb-4d63-a8ae-d8e6cb432646' WHERE id = '827aedb3-2edb-4d63-a8ae-d8e6cb432646';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('07b18d8f-da6d-424b-a92c-bb10d0a6ddb0', '00000000-0000-0000-0000-000000000000', 'barbara.davis@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Barbara Davis"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('07b18d8f-da6d-424b-a92c-bb10d0a6ddb0', 'barbara.davis@example.com', 'member', 'Barbara Davis', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '07b18d8f-da6d-424b-a92c-bb10d0a6ddb0' WHERE id = '07b18d8f-da6d-424b-a92c-bb10d0a6ddb0';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('b48f6988-3104-4f5f-aaed-499de0c7cfa7', '00000000-0000-0000-0000-000000000000', 'dorothy.foster@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Dorothy Foster"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('b48f6988-3104-4f5f-aaed-499de0c7cfa7', 'dorothy.foster@example.com', 'member', 'Dorothy Foster', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'b48f6988-3104-4f5f-aaed-499de0c7cfa7' WHERE id = 'b48f6988-3104-4f5f-aaed-499de0c7cfa7';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('972bf66e-9b51-42e5-ac75-1c848969b415', '00000000-0000-0000-0000-000000000000', 'sharon.robinson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Sharon Robinson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('972bf66e-9b51-42e5-ac75-1c848969b415', 'sharon.robinson@example.com', 'member', 'Sharon Robinson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '972bf66e-9b51-42e5-ac75-1c848969b415' WHERE id = '972bf66e-9b51-42e5-ac75-1c848969b415';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('2d416e14-7c44-4db7-a183-9b115f01ed6e', '00000000-0000-0000-0000-000000000000', 'james.thompson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"James Thompson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('2d416e14-7c44-4db7-a183-9b115f01ed6e', 'james.thompson@example.com', 'member', 'James Thompson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '2d416e14-7c44-4db7-a183-9b115f01ed6e' WHERE id = '2d416e14-7c44-4db7-a183-9b115f01ed6e';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('ddac797e-398d-4e76-ae6e-374ac08872aa', '00000000-0000-0000-0000-000000000000', 'robert.henderson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Robert Henderson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('ddac797e-398d-4e76-ae6e-374ac08872aa', 'robert.henderson@example.com', 'member', 'Robert Henderson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'ddac797e-398d-4e76-ae6e-374ac08872aa' WHERE id = 'ddac797e-398d-4e76-ae6e-374ac08872aa';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('6209c170-ab70-4f5d-a830-04941e7109c1', '00000000-0000-0000-0000-000000000000', 'linda.swartz@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Linda Swartz"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('6209c170-ab70-4f5d-a830-04941e7109c1', 'linda.swartz@example.com', 'member', 'Linda Swartz', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '6209c170-ab70-4f5d-a830-04941e7109c1' WHERE id = '6209c170-ab70-4f5d-a830-04941e7109c1';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f4364626-8792-4a31-ab48-291048ac41be', '00000000-0000-0000-0000-000000000000', 'angela.thompson@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Angela Thompson"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('f4364626-8792-4a31-ab48-291048ac41be', 'angela.thompson@example.com', 'member', 'Angela Thompson', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = 'f4364626-8792-4a31-ab48-291048ac41be' WHERE id = 'f4364626-8792-4a31-ab48-291048ac41be';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('1346cd02-dd1c-49fe-a466-608615022b50', '00000000-0000-0000-0000-000000000000', 'timothy.bell@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Timothy Bell"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('1346cd02-dd1c-49fe-a466-608615022b50', 'timothy.bell@example.com', 'member', 'Timothy Bell', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '1346cd02-dd1c-49fe-a466-608615022b50' WHERE id = '1346cd02-dd1c-49fe-a466-608615022b50';
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a', '00000000-0000-0000-0000-000000000000', 'rachel.mitchell@example.com', '$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"display_name":"Rachel Mitchell"}', now(), now(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES ('3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a', 'rachel.mitchell@example.com', 'member', 'Rachel Mitchell', TRUE) ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;
UPDATE members SET profile_id = '3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a' WHERE id = '3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a';

-- --------------------------------------------------------------------------
-- forum_posts
-- --------------------------------------------------------------------------
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('7ff5cd4c-dd38-4f66-abaa-a485030e7365', '15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'Prayer for the Henderson Family', 'prayer-for-the-henderson-family', 'Dear church family,

Please keep the Henderson family in your prayers this week. Robert is having knee surgery on Thursday and will need several weeks of recovery.

Patricia could also use encouragement as she takes on extra responsibilities during this time. If anyone is able to help with meals, that would be a tremendous blessing.

> "Cast all your anxiety on him because he cares for you." - 1 Peter 5:7

Thank you for your faithful prayers!', 'published', TRUE, FALSE, 5);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('c6cdfb8c-5670-442a-a9be-00961ea0de80', 'e7225b77-c098-4345-afdd-5a8dac48c056', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'Summer VBS Registration Now Open', 'summer-vbs-registration-now-open', '# Vacation Bible School 2026

We are excited to announce that **VBS registration is now open!**

**Dates:** June 15-19, 2026
**Time:** 9:00 AM - 12:00 PM
**Ages:** 4 years old through 5th grade

## What to Expect
- Bible stories and lessons
- Worship and music
- Crafts and games
- Snacks provided daily

## Volunteer Needs
We still need volunteers in the following areas:
- Group leaders
- Craft station helpers
- Snack preparation
- Registration desk

Please sign up at the welcome desk on Sunday or contact Sarah Pike for more information.

*Let''s make this the best VBS yet!*', 'published', TRUE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('cf291f5d-347c-40c9-a851-1536103eda59', '15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', 'Praying for My Mother''s Health', 'praying-for-my-mothers-health', 'Hi everyone,

I''m asking for prayer for my mother who lives in Ohio. She was recently diagnosed with early-stage breast cancer and will be starting treatment next month.

She has a strong faith but is understandably anxious about what lies ahead. Please pray for:

- **Wisdom** for her doctors as they develop a treatment plan
- **Peace** for my mom as she processes everything
- **Strength** for our family as we support her from a distance

I''m so grateful for this church family and your faithfulness in prayer. It means the world to us.

With love,
Grace', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('0b053321-1197-481f-a068-33b307232cf3', '305341ab-2c48-4e53-a54b-5c092f610c7e', '0cc184d8-668d-45a6-a37c-b907cddd77f5', 'Romans Study - Chapter 8 Discussion', 'romans-study-chapter-8-discussion', 'For those following along with our Romans study, this week we''re diving into **Chapter 8** - one of the most powerful chapters in all of Scripture.

## Key Themes to Consider
1. Life in the Spirit vs. life in the flesh (v. 1-11)
2. Our adoption as children of God (v. 12-17)
3. Future glory and present suffering (v. 18-30)
4. Nothing can separate us from God''s love (v. 31-39)

## Discussion Questions
- What does it mean practically to "set your mind on the Spirit" in daily life?
- How does the promise of Romans 8:28 sustain you during difficult seasons?
- Which verse in this chapter resonates most with you right now, and why?

Feel free to share your thoughts, questions, or insights below. Looking forward to the conversation!', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('080ebca4-262d-43d4-aa8c-8409c8023187', 'ad01d0ae-e02f-4c65-a30c-eede8684c08e', 'db94a381-17b6-4670-ac85-0c2a3e320487', 'Church Potluck This Saturday!', 'church-potluck-this-saturday', 'Hey Redeemer family!

Join us for our monthly **church potluck** this Saturday evening.

**When:** Saturday, February 21st at 5:30 PM
**Where:** Fellowship Hall

## What to Bring
- **Last names A-H:** Main dish
- **Last names I-P:** Side dish
- **Last names Q-Z:** Dessert

Drinks, plates, and utensils will be provided.

This is a great opportunity to connect with other families, especially if you''re newer to Redeemer. Everyone is welcome — bring your neighbors!

See you there!', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('fb739515-a72a-4e25-a246-ee0021c9456d', 'e7225b77-c098-4345-afdd-5a8dac48c056', '0cc184d8-668d-45a6-a37c-b907cddd77f5', 'Elder Board Update - February', 'elder-board-update-february', '# February Elder Board Update

Dear Redeemer Church,

The elders met this past Tuesday and wanted to share a few updates with the congregation:

## Budget Update
We are on track with our annual budget through January. Thank you for your generous and faithful giving.

## Building Maintenance
The HVAC system in the main sanctuary will be serviced next week. Sunday services will not be affected.

## Upcoming Events
- **March 1:** New member orientation
- **March 15:** Congregational meeting
- **April 5:** Easter Sunday services (two services planned)

## Prayer Requests
Please continue to pray for our pastoral search process. We have received several strong candidates and are moving forward prayerfully.

If you have any questions or concerns, please don''t hesitate to reach out to any of the elders.

In Christ,
The Elder Board', 'published', TRUE, FALSE, 0);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('ba738fd9-0f67-4d50-a686-b8a02911d32e', 'ef517afa-cdf2-465a-a539-9d66876557e9', 'd1d87b29-7420-45e8-ad98-025cfc3943e7', 'Food Pantry Volunteers Needed This Month', 'food-pantry-volunteers-needed-this-month', 'Our food pantry is running low on volunteers for the next few distribution dates. We especially need help on:

- **Saturday, Feb 22** (8 AM - 12 PM)
- **Saturday, Mar 1** (8 AM - 12 PM)

## How You Can Help
- Sorting and organizing donated food
- Packing boxes for families
- Greeting and assisting families at pickup
- Loading boxes into vehicles

No experience needed! Just a willing heart and comfortable shoes.

We also have a **critical need** for the following items:
- Canned vegetables
- Peanut butter
- Rice and pasta
- Canned soup

Drop off donations in the bin outside the fellowship hall anytime.

Contact Patricia Henderson or sign up on the bulletin board. Thank you!', 'published', FALSE, FALSE, 3);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('fd6f3fe6-ebc8-43d3-a18b-192283713a3e', '5d1a6c13-e80b-4eb9-a179-c0126373e05d', 'bc194bf3-0abb-435f-a266-022975321ba0', 'Youth Group Lock-In - March 7', 'youth-group-lock-in-march-7', 'Calling all middle and high schoolers!

Our **Spring Lock-In** is happening on **Friday, March 7th** from 7 PM to 7 AM Saturday.

## What''s Planned
- Games and tournaments
- Worship time
- Late-night devotional
- Pizza and snacks (lots of snacks)
- Movie marathon

## Details
- **Cost:** $10 per student
- **Drop-off:** 7:00 PM at the church
- **Pick-up:** 7:00 AM Saturday morning
- **What to bring:** Sleeping bag, pillow, Bible, change of clothes

Permission slips are available at the youth table on Sunday. Please return them by **March 5th**.

Parent volunteers welcome! We need at least 4 adult chaperones. Contact Christopher Brooks if you can help.', 'published', FALSE, FALSE, 3);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('d014aa1a-fc6e-4c12-a6d1-42c062977788', '15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', 'Prayer for Safe Travels', 'prayer-for-safe-travels', 'Hi church family,

Richard and I are heading to visit our son in North Carolina this weekend. Would you please pray for safe travels? The weather forecast is calling for rain along I-95.

Also praying for everyone in our church family this week. God is good!

*"The Lord will watch over your coming and going both now and forevermore."* - Psalm 121:8

Love,
Lisa', 'published', FALSE, FALSE, 2);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', '2f8783f8-6f56-4a08-a020-a20c80f6da1b', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', 'God Answered Our Prayers!', 'god-answered-our-prayers', 'I just wanted to share some wonderful news with our church family.

Many of you have been praying for Priya''s job situation over the past few months. After a long and sometimes discouraging search, she received an offer this week for a position that is even better than what we had hoped for!

The hours work perfectly with the kids'' schedules, the commute is short, and the team seems wonderful.

We are so grateful for God''s faithfulness and for each of you who prayed and encouraged us during this season. He truly does "immeasurably more than all we ask or imagine" (Ephesians 3:20).

Thank you, Redeemer family. We love you all!', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('e7c798e9-3ff5-4e39-aba7-e3f4ab19c367', '305341ab-2c48-4e53-a54b-5c092f610c7e', '6acaa649-859d-4df4-a197-1cb1a3f767c2', 'Book Recommendation: Knowing God by J.I. Packer', 'book-recommendation-knowing-god', 'Has anyone read **"Knowing God"** by J.I. Packer? I just finished it and found it incredibly rich.

A few highlights that stood out to me:

- The distinction between *knowing about* God and truly *knowing* God
- The chapter on God''s wisdom and how He guides us
- The beautiful exploration of adoption as God''s children

I think it would make an excellent group study. Would anyone be interested in reading through it together over the next couple of months?

We could discuss a few chapters each week here on the forum or in person. Let me know if you''d be interested!', 'published', FALSE, FALSE, 3);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('e7866c58-0dd1-49d1-a169-121bfa14d92a', 'ad01d0ae-e02f-4c65-a30c-eede8684c08e', '3602dfc9-caa4-481b-a2c5-061764f91d3f', 'Moms'' Coffee Meetup - Every Other Friday', 'moms-coffee-meetup-every-other-friday', 'Hey moms!

A few of us have been meeting for coffee every other Friday morning and we''d love for more of you to join us.

**When:** Every other Friday, 9:30 AM
**Where:** Buddy Brew Coffee on Boyette Rd
**Kids:** Welcome! They have a nice outdoor seating area.

It''s a casual time to connect, share what''s on our hearts, and encourage one another. No agenda, no pressure - just good coffee and good company.

Our next meetup is **February 20th**. Hope to see you there!

Feel free to reach out if you have questions.', 'published', FALSE, FALSE, 3);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('65f754e1-2c7f-4e8d-af34-1ef399305be4', 'ef517afa-cdf2-465a-a539-9d66876557e9', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', 'Men''s Service Day - Helping a Church Family', 'mens-service-day-helping-a-church-family', 'Men of Redeemer,

One of our church families needs some help with yard work and minor home repairs. Let''s come together and serve them well!

**When:** Saturday, March 8th, 8:00 AM - 12:00 PM
**Where:** Details will be shared with those who sign up (to respect the family''s privacy)

## Tasks Needed
- Lawn mowing and edging
- Hedge trimming
- Gutter cleaning
- Minor fence repair
- Pressure washing the driveway

## What to Bring
- Work gloves
- Any tools you have (mowers, trimmers, pressure washer)
- A servant''s heart

Breakfast burritos and coffee provided!

Sign up by replying below or catch me on Sunday. Let''s show the love of Christ through our actions.', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('c6e218c2-456b-47c2-ac35-e84d40a0baad', '6883c2c8-8c34-4beb-ad8c-b496b9dfbc72', '29937a53-3e0b-47a8-a705-449317199717', 'Worship Song Suggestions Welcome', 'worship-song-suggestions-welcome', 'Hey church family,

As the worship team plans out the next few months, we''d love your input!

Are there any **hymns or worship songs** you''d love to sing on Sunday mornings? We want to include songs that are meaningful to our congregation.

We try to have a good mix of:
- Classic hymns
- Modern worship songs
- Scripture-based songs

Drop your suggestions below and we''ll do our best to work them into our rotation. Thanks!', 'published', FALSE, FALSE, 4);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('4ac226dd-b88b-4288-a858-da0c735e65ec', '15e0b6c8-c9b8-4c50-a1c7-bcf6e86ef1f9', 'a77a914e-ceb8-4a33-aef9-35775117d6fa', 'Please Pray for My Coworker', 'please-pray-for-my-coworker', 'Church family, I have a coworker named Dave who is going through a really tough divorce. He has two young kids and is struggling with a lot of pain and confusion right now.

He''s not a believer, but he''s been open to talking about faith lately. I''ve been trying to be a light to him and share the hope we have in Christ.

Please pray for:
- **Healing** in his family situation
- **Openness** to the Gospel
- **Wisdom** for me to know how to be a good friend and witness

I know God is working even in the midst of this difficult season. Thank you for standing with me in prayer.', 'published', FALSE, FALSE, 2);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('ece3805d-842d-4c54-abd3-2860308fe24c', '5d1a6c13-e80b-4eb9-a179-c0126373e05d', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', 'Children''s Ministry Curriculum Update', 'childrens-ministry-curriculum-update', 'Hi parents!

I wanted to let you know about some exciting changes in Children''s Ministry this spring.

## New Curriculum
Starting in March, we''ll be using **The Gospel Project** curriculum for all age groups. This Christ-centered curriculum walks through the entire Bible, showing how every story points to Jesus.

## Age Groups
- **Nursery (0-2):** Sensory-based Bible stories
- **Preschool (3-5):** Interactive lessons with crafts
- **Elementary (K-5th):** Bible study with small group discussion

## Parent Resources
Each week, you''ll receive a take-home sheet with:
- Summary of the lesson
- Discussion questions for the dinner table
- Memory verse for the week

Please let me know if you have any questions. We''re so excited about what God is doing in the hearts of our kids!

Blessings,
Sarah Pike', 'published', FALSE, FALSE, 0);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('b8767199-4e2b-47fe-a884-a3f56b19b621', '2f8783f8-6f56-4a08-a020-a20c80f6da1b', '9f80a4c5-3140-4fd0-aa40-5ff512a8975e', 'Praise Report - Clean Scan Results!', 'praise-report-clean-scan-results', 'Friends, I am overjoyed to share that Mai''s latest scan came back completely clear!

For those who may not know, Mai was treated for thyroid cancer last year. After months of treatment and many prayers from this wonderful church family, her doctor confirmed today that there is **no evidence of disease**.

We serve a mighty God. Thank you all for every prayer, every meal, every encouraging text. You carried us through the darkest valley and we will never forget your love.

*"Praise the Lord, my soul, and forget not all his benefits - who forgives all your sins and heals all your diseases."* - Psalm 103:2-3

All glory to God!', 'published', FALSE, FALSE, 2);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('bed34041-4ddb-4b27-a6be-5f2247a4d576', 'ad01d0ae-e02f-4c65-a30c-eede8684c08e', '9013451b-04a7-4791-a32f-608b5f9f0c94', 'Game Night at the Coleman Home', 'game-night-at-the-coleman-home', 'Megan and I would love to host a **game night** at our place!

**When:** Friday, February 27th at 7:00 PM
**Where:** 1633 Boyette Rd (our house)

We''ll have a few board games and card games ready, but feel free to bring your favorites too.

Snacks and drinks will be provided, but you''re welcome to bring something to share.

All ages welcome! Kids can play in the bonus room while the adults battle it out over Settlers of Catan.

RSVP below so we know how many chairs to set up!', 'published', FALSE, FALSE, 2);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('f7f55681-7005-4bc3-a1c0-5b95a3bcd1ee', 'e7225b77-c098-4345-afdd-5a8dac48c056', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'Website and Directory App Coming Soon', 'website-and-directory-app-coming-soon', 'Hi everyone,

I''m excited to share that we''ve been working on a **new church directory and community app** for Redeemer!

## What It Will Include
- **Member Directory** - Find contact info for church families
- **Community Groups** - See group details and sign up
- **Ministry Info** - Learn about serving opportunities
- **Community Forum** - This forum you''re reading right now!

## Timeline
We''re aiming to have the app ready for the congregation by **early spring 2026**. We''ll send out invitations with login instructions.

## Privacy
Your privacy matters. You''ll be able to control what contact information is visible to other members.

If you have any suggestions or feedback, let me know. We want this to be a tool that truly serves our church family.

Thanks!
Matt', 'published', FALSE, FALSE, 1);
INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES ('2db37ad8-888c-480d-a489-62b8b923e6fc', '6883c2c8-8c34-4beb-ad8c-b496b9dfbc72', '4b7769cc-d57b-4a66-a539-30b438d51d0c', 'Recommended Podcasts for Daily Devotion', 'recommended-podcasts-for-daily-devotion', 'I''ve been enjoying some great podcasts for my morning commute and thought I''d share them with the church family. These have been a real blessing:

1. **Truth for Life** with Alistair Begg - Solid, verse-by-verse Bible teaching
2. **The Daily Grace Co. Podcast** - Great for women''s devotional content (Martha loves this one)
3. **Ask Pastor John** by Desiring God - Short answers to tough theological questions
4. **The Briefing** by Albert Mohler - Christian worldview on current events

Do you all have any favorites? I''m always looking for more good content.

Sharing is caring!', 'published', FALSE, FALSE, 1);

-- --------------------------------------------------------------------------
-- forum_comments
-- --------------------------------------------------------------------------
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('d25f7f6d-aeae-4043-a546-706684fedb48', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', NULL, 'Praying for Robert and the whole Henderson family. Please let us know if there''s anything we can do to help with meals or rides!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('d0f4887e-81b5-4107-a514-dcaf67bf7f8a', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', NULL, 'We''ll be lifting Robert up in prayer at our Bible study this week. Patricia, don''t hesitate to call if you need anything at all.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('398554b3-3386-4da5-abe7-1f0a3fb1f0b9', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', NULL, 'Lord, we ask for Your healing hand over Robert. Grant the surgeons wisdom and give the family peace. Amen.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('34b5b42b-d464-451d-a9d9-b426fb8d3d5b', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8', NULL, 'This is so exciting! Caleb is finally old enough to attend this year. I''d love to help with the craft station too!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('aa6e47ba-8a93-44c3-a4f9-3b5fe15d7dd9', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', 'dcf8d1bf-3809-4823-afe7-a6341811c429', NULL, 'Lily can''t wait! She''s been asking about VBS since January. I can help with snack prep on Monday and Tuesday.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('623cc01b-d10a-4268-ae53-3ac1e9586516', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', '4020f5ed-6c4e-4cd9-a92d-cf34448aa032', NULL, 'Count us in! Isabella will be there. I can volunteer for registration desk if that still needs to be filled.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('37d265b9-d92e-4b49-ab9e-725632c7c3cf', 'cf291f5d-347c-40c9-a851-1536103eda59', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', NULL, 'Grace, thank you for sharing this with us. We will be praying fervently for your mother. God is near to the brokenhearted.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('a187b328-9212-4da1-aab1-acdb37a9076e', 'cf291f5d-347c-40c9-a851-1536103eda59', 'd64de394-127e-4efd-ab49-8ad2433d84a4', NULL, 'Praying for complete healing and for peace that passes understanding for your whole family. You are so loved.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('f61c826c-134d-4e16-a7a6-486c90c15682', 'cf291f5d-347c-40c9-a851-1536103eda59', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', NULL, 'Lifting your mom up in prayer, Grace. Our God is the Great Physician. Please keep us updated.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('cc7b4c07-3ea1-47fd-a5d5-71c20b2f6bbf', 'cf291f5d-347c-40c9-a851-1536103eda59', '55b5c086-1085-45b6-a96c-99b925b78580', NULL, 'Praying right now. If there''s anything practical we can do to help, even from a distance, please let us know.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('d6517d24-4dbb-42e0-af4d-41ed14f8e4a0', '0b053321-1197-481f-a068-33b307232cf3', '6acaa649-859d-4df4-a197-1cb1a3f767c2', NULL, 'Romans 8:28 has been my anchor verse for years. Even when circumstances don''t make sense, knowing that God is working all things together for good gives me such hope.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('3d76bf46-f4a4-4f28-a3b8-2f17adeb4cd5', '0b053321-1197-481f-a068-33b307232cf3', '21a42f19-7c2b-4490-a3d4-9f88484d4907', NULL, 'For me, verses 38-39 are the most powerful. Nothing in all creation can separate us from God''s love. That''s the foundation everything else rests on.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('4a4596eb-ef71-4f93-ab17-19fc68f81c3c', '0b053321-1197-481f-a068-33b307232cf3', 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96', NULL, 'I''ve been meditating on verses 14-17 about adoption. As an adoptive parent myself, the imagery of being adopted into God''s family hits differently. So beautiful.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('4732111b-bcac-4f3a-a834-15f18da99907', '080ebca4-262d-43d4-aa8c-8409c8023187', '235e8068-cbec-4af1-a8e9-995750db883e', NULL, 'Denise and I will be there! We''re bringing her famous mac and cheese. See everyone Saturday!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('81eca7c5-2198-4d6f-a573-daf490c05c5c', '080ebca4-262d-43d4-aa8c-8409c8023187', '116520f9-7c8c-41b3-ab92-1eadcc006998', NULL, 'We''re looking forward to it! Is there a kids'' area or should we bring something to keep the little ones busy?');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('9686800d-3205-4b4f-aa75-afc0277f4199', '080ebca4-262d-43d4-aa8c-8409c8023187', '827aedb3-2edb-4d63-a8ae-d8e6cb432646', NULL, 'Ana is making her arroz con pollo. It feeds an army! Can''t wait to see everyone.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('a72d3a7b-64c8-459f-a4df-1915e3652ef2', 'ba738fd9-0f67-4d50-a686-b8a02911d32e', '07b18d8f-da6d-424b-a92c-bb10d0a6ddb0', NULL, 'I can volunteer on Feb 22! I''ll bring William too. Happy to help with loading boxes.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('97738930-3a5f-4a28-a1c3-64debe714cc3', 'ba738fd9-0f67-4d50-a686-b8a02911d32e', 'b48f6988-3104-4f5f-aaed-499de0c7cfa7', NULL, 'Steven and I will be there on March 1st. We also have several bags of canned goods to donate.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('029fde78-f85a-46c9-ab18-bea742628c58', 'ba738fd9-0f67-4d50-a686-b8a02911d32e', '972bf66e-9b51-42e5-ac75-1c848969b415', NULL, 'I''ll sign up for both dates. This ministry is so important for our community.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('03614a34-5a45-4cce-a274-aad002abb859', 'fd6f3fe6-ebc8-43d3-a18b-192283713a3e', 'a77a914e-ceb8-4a33-aef9-35775117d6fa', NULL, 'Liam is so excited for this! I can be one of the adult chaperones. Just let me know what''s needed.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('f5c520f3-e69e-4982-a62b-79e75e465016', 'fd6f3fe6-ebc8-43d3-a18b-192283713a3e', '2d416e14-7c44-4db7-a183-9b115f01ed6e', NULL, 'Noah has been counting down the days! Angela and I can both help chaperone if you still need people.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('6a1d3ebf-6cb3-43dd-a560-7989fee5fd09', 'd014aa1a-fc6e-4c12-a6d1-42c062977788', 'ddac797e-398d-4e76-ae6e-374ac08872aa', NULL, 'Safe travels, Lisa and Richard! Praying for clear roads and a wonderful visit with your son.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('cfb642e9-b54d-424e-a1f3-717778c73a61', 'd014aa1a-fc6e-4c12-a6d1-42c062977788', '6209c170-ab70-4f5d-a830-04941e7109c1', NULL, 'Praying for safe travels! Enjoy the time with family.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('81ef2f89-3eec-4845-aa4a-250e74ed1cb6', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', NULL, 'What incredible news, Raj! God is so faithful. Congratulations to Priya! This is truly an answer to prayer.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('55b250a0-47fc-4e99-af27-2ecea2ae53c1', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', NULL, 'Praise the Lord! We''ve been praying for this and I''m so happy for your family. God''s timing is always perfect.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('757a3224-31fe-410f-a596-45b81be7aa57', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', 'f4364626-8792-4a31-ab48-291048ac41be', NULL, 'So happy for you all! God is good, all the time.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('3e429857-3f68-4b2e-a70e-6aab79b4f922', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', NULL, 'What a wonderful testimony of God''s faithfulness! Celebrating with you!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('11ed3a17-cfa0-4530-ad64-17c06d120dbb', 'e7c798e9-3ff5-4e39-aba7-e3f4ab19c367', '0cc184d8-668d-45a6-a37c-b907cddd77f5', NULL, 'I read this years ago and it profoundly shaped my understanding of God. I''d love to go through it again with a group!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('e2c98b0a-08a2-480d-a228-1340613bb30f', 'e7c798e9-3ff5-4e39-aba7-e3f4ab19c367', '21a42f19-7c2b-4490-a3d4-9f88484d4907', NULL, 'Count me in! I''ve had it on my shelf but never gotten around to reading it. This would be great motivation.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('6356fe60-fbca-4a37-a502-a9e5eb39dda7', 'e7c798e9-3ff5-4e39-aba7-e3f4ab19c367', '1346cd02-dd1c-49fe-a466-608615022b50', NULL, 'Brian, this is a great idea. I''d suggest we do 2-3 chapters per week so it''s manageable. Christine and I are both interested.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('389612a1-1755-4041-ad15-335ed84b3b0b', 'e7866c58-0dd1-49d1-a169-121bfa14d92a', 'dcf8d1bf-3809-4823-afe7-a6341811c429', NULL, 'Love this! I''ve been looking for a way to connect with other moms. I''ll be there on the 20th with Lily!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('41770d4e-30a8-4c19-a577-fa46d8bffb07', 'e7866c58-0dd1-49d1-a169-121bfa14d92a', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', NULL, 'What a great idea, Amanda! I''ll bring Ethan and join you. So looking forward to it!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('c6fc8a5f-163b-40ec-a421-db6328a40831', 'e7866c58-0dd1-49d1-a169-121bfa14d92a', '116520f9-7c8c-41b3-ab92-1eadcc006998', NULL, 'Yes! Lucas and I will be there. Thanks for organizing this!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('d561174b-fe7b-417c-aa7f-33fabba51d61', '65f754e1-2c7f-4e8d-af34-1ef399305be4', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', NULL, 'I''m in! I have a pressure washer I can bring. What time should we meet?');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('fc65d58e-881e-4e4c-af57-872735e3ad86', '65f754e1-2c7f-4e8d-af34-1ef399305be4', '2d416e14-7c44-4db7-a183-9b115f01ed6e', NULL, 'Count me in. I''ll bring my hedge trimmer and mower.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('54fa115d-ee9f-4c4f-a8fb-6a4ac6810d93', '65f754e1-2c7f-4e8d-af34-1ef399305be4', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', NULL, 'Happy to help! I have some fencing supplies too if they''re needed.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('4ce6072b-52b4-476a-aeea-be477ab6ab80', 'c6e218c2-456b-47c2-ac35-e84d40a0baad', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', NULL, 'I''d love to hear ''In Christ Alone'' more often. Such a powerful hymn.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('3a5f5bbf-fe97-4a94-a7f3-93e7a1d6d052', 'c6e218c2-456b-47c2-ac35-e84d40a0baad', '3936dfa5-caf9-4dc5-a7f1-b4ba50cc637a', NULL, 'How about ''It Is Well With My Soul''? It''s been a while since we''ve sung that one and it''s one of my favorites.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('b6b25353-d7fe-483f-a45a-c72689bdd6b0', 'c6e218c2-456b-47c2-ac35-e84d40a0baad', '235e8068-cbec-4af1-a8e9-995750db883e', NULL, 'I really enjoy when we do ''Build My Life'' by Housefires. Also, ''Great Is Thy Faithfulness'' always moves me.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('6b823778-27a9-40c4-a1ad-60002bb243e9', '4ac226dd-b88b-4288-a858-da0c735e65ec', '6acaa649-859d-4df4-a197-1cb1a3f767c2', NULL, 'Praying for Dave right now, Sean. What a privilege to be a light in his life during this dark season.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('d839d2fe-fb27-4ed9-ab0b-08a1ae0a5413', '4ac226dd-b88b-4288-a858-da0c735e65ec', 'ddac797e-398d-4e76-ae6e-374ac08872aa', NULL, 'Lord, soften Dave''s heart and draw him near. Give Sean the right words at the right time. Amen.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('5b038454-6c90-4c98-a225-de1df86f087b', 'b8767199-4e2b-47fe-a884-a3f56b19b621', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', NULL, 'Praise God!! This is the best news! We''ve been praying for Mai and your whole family. What a faithful God we serve!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('a1ef782a-1607-4988-a30b-803945be893c', 'b8767199-4e2b-47fe-a884-a3f56b19b621', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', NULL, 'David, this is absolutely wonderful. God is so good. Thank you for sharing this praise report!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('4d94a203-aba0-4b4f-a673-74fd06622198', 'bed34041-4ddb-4b27-a6be-5f2247a4d576', 'db94a381-17b6-4670-ac85-0c2a3e320487', NULL, 'Maria and I will be there! We''ll bring chips and dip. I call dibs on being the banker in Monopoly.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('f9a8c238-24e7-4002-abdf-ba63aadb4f0c', 'bed34041-4ddb-4b27-a6be-5f2247a4d576', '29937a53-3e0b-47a8-a705-449317199717', NULL, 'Sounds like a blast! Heather and I are in. We''ll bring Ticket to Ride.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('b810660d-bdbd-4d01-a099-79d39865efdc', 'f7f55681-7005-4bc3-a1c0-5b95a3bcd1ee', '6acaa649-859d-4df4-a197-1cb1a3f767c2', NULL, 'This is going to be a great resource for our church. Thanks for putting in the work on this, Matt!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('51e21fa9-769e-4a4f-a9c3-0bbb42a2bb2e', '2db37ad8-888c-480d-a489-62b8b923e6fc', 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96', NULL, 'I''d add ''Through the Word'' to that list. It''s a great app/podcast that walks through the Bible chapter by chapter. Very accessible.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('f94dae04-aa41-4bff-a1ce-f8601764e97a', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', '29937a53-3e0b-47a8-a705-449317199717', 'd25f7f6d-aeae-4043-a546-706684fedb48', 'Heather and I can do a meal on Friday evening. Sarah, should we coordinate through you or reach out to Patricia directly?');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('852c9857-ddbb-4bac-a370-1f93128568f4', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', 'f94dae04-aa41-4bff-a1ce-f8601764e97a', 'That would be wonderful, Jason! I''ll set up a meal train and share the link. Friday works perfectly.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('ed27120a-5e06-48ed-a945-fb5125c872ff', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', '34b5b42b-d464-451d-a9d9-b426fb8d3d5b', 'Wonderful, Jessica! I''ll put you down for crafts. And yes, Caleb is going to love it!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('81ef2838-de9c-4eb0-a431-f6036fd54641', '0b053321-1197-481f-a068-33b307232cf3', '6b71062c-7689-4224-a7f2-beb3f25303ee', '3d76bf46-f4a4-4f28-a3b8-2f17adeb4cd5', 'Amen, Richard! That passage is one I come back to again and again. The list Paul gives is so comprehensive - nothing is left out.');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('1e91b448-b596-4453-a34b-64f0af9e5921', '080ebca4-262d-43d4-aa8c-8409c8023187', 'db94a381-17b6-4670-ac85-0c2a3e320487', '81eca7c5-2198-4d6f-a573-daf490c05c5c', 'Great question, Megan! We''ll have a kids'' corner set up with coloring sheets and games. Bring the kiddos!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('2ca6b386-fd46-4e14-a01c-099c38a84f7a', 'fd6f3fe6-ebc8-43d3-a18b-192283713a3e', 'bc194bf3-0abb-435f-a266-022975321ba0', '03614a34-5a45-4cce-a274-aad002abb859', 'Awesome, Sean! That gives us three chaperones. Just one more needed. Thanks so much!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('342fc805-7bbc-440b-a38f-cd9179b33774', '65f754e1-2c7f-4e8d-af34-1ef399305be4', '4eb6c7b0-dd7d-41db-aa2a-fa8ae3f98917', 'd561174b-fe7b-417c-aa7f-33fabba51d61', '8 AM sharp, Matt! And yes, the pressure washer would be perfect. Thanks brother!');
INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES ('276cdfca-dc6d-4cb2-a3d3-921bd001f498', 'c6e218c2-456b-47c2-ac35-e84d40a0baad', '29937a53-3e0b-47a8-a705-449317199717', '4ce6072b-52b4-476a-aeea-be477ab6ab80', 'Great suggestion, Grace! We actually have that on the list for next month. Stay tuned!');

-- --------------------------------------------------------------------------
-- forum_reactions
-- --------------------------------------------------------------------------
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('8957e395-6186-458e-a587-225187ee74a4', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('b45da36b-94e3-4326-a738-460070335e4d', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('f5390b28-0330-4651-af4f-a5164f55df35', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('4a24cf9b-b177-4d34-a1b3-610cc023c820', '29937a53-3e0b-47a8-a705-449317199717', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('1ce316ef-c8db-4478-a878-cf3efaf299a4', 'd64de394-127e-4efd-ab49-8ad2433d84a4', '7ff5cd4c-dd38-4f66-abaa-a485030e7365', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('247c4ca0-e7cc-4abb-a0fd-4d6a2e741fc3', 'd653fb54-031a-45a2-a4be-5415d4a0b1d8', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('f42f06e9-28f4-4172-a22e-1c1b34d47d5f', 'dcf8d1bf-3809-4823-afe7-a6341811c429', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('bc14811d-53dc-409c-aa39-27085b8fa506', '4020f5ed-6c4e-4cd9-a92d-cf34448aa032', 'c6cdfb8c-5670-442a-a9be-00961ea0de80', NULL, 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('707a86bb-17b2-4e3b-a615-8660facc511a', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'cf291f5d-347c-40c9-a851-1536103eda59', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('b8aaefa1-e965-4d29-ab9c-ad71dbf7335e', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'cf291f5d-347c-40c9-a851-1536103eda59', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('d6172bc7-24bf-41fd-ab55-207cc6dcc0d7', '55b5c086-1085-45b6-a96c-99b925b78580', 'cf291f5d-347c-40c9-a851-1536103eda59', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('071c591e-95c4-4354-ae11-64b94f6f239c', 'd64de394-127e-4efd-ab49-8ad2433d84a4', 'cf291f5d-347c-40c9-a851-1536103eda59', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('33ebdb96-054e-4646-a37c-0734e9647264', '6acaa649-859d-4df4-a197-1cb1a3f767c2', '0b053321-1197-481f-a068-33b307232cf3', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('cb52c3c2-3688-4491-a739-539325d3b6af', '6b71062c-7689-4224-a7f2-beb3f25303ee', '0b053321-1197-481f-a068-33b307232cf3', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('95b9b3e4-198d-47e4-a04b-3f6daf93bdd0', 'e5ff0fdb-3969-4641-a5a4-e185a3e64a96', '0b053321-1197-481f-a068-33b307232cf3', NULL, 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('530f72c0-905a-432b-a2c1-4726e899328a', '235e8068-cbec-4af1-a8e9-995750db883e', '080ebca4-262d-43d4-aa8c-8409c8023187', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('8e609ae2-b919-4ca9-ad54-fde3d01f04f3', '116520f9-7c8c-41b3-ab92-1eadcc006998', '080ebca4-262d-43d4-aa8c-8409c8023187', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('4cc82425-e5c0-43cc-a4dc-97a7e7a93149', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'fb739515-a72a-4e25-a246-ee0021c9456d', NULL, 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('c0d79ce4-5a82-4b4d-a371-ed78c863053c', '6acaa649-859d-4df4-a197-1cb1a3f767c2', 'fb739515-a72a-4e25-a246-ee0021c9456d', NULL, 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('2afa9c1a-06ba-4eb7-a91a-b1151592cac6', '21a42f19-7c2b-4490-a3d4-9f88484d4907', 'fb739515-a72a-4e25-a246-ee0021c9456d', NULL, 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('3351e65d-721b-4df5-a553-61cb7a7c6c4f', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('ed533ed3-cae1-42c1-a22b-6bb66e8f1a86', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('6f5d4e0c-70da-4607-a553-bba698a61d97', 'f4364626-8792-4a31-ab48-291048ac41be', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('fc6f6d56-05c3-4ebe-ae5f-c3ae318c20f7', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('145563d4-ae65-4b23-a906-91d97b3c5e39', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', '61fd9c3d-b1d7-4bf3-adf1-67cadd903ee1', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('1e7bd989-fa22-447e-a3aa-20df804b5720', '161b392f-d0cb-4760-a2ce-caaeb14ad3f9', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('fab69d6f-9115-42a4-a552-cb0a85e38a46', '10c08eb8-1a54-406c-a9f9-dfaa930e3580', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('57735e8c-64fa-40d3-a3df-ee699d4c298b', 'eaff4c1b-ec32-4507-aa38-bc34ba081bae', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('26d927f7-70b9-4e00-a0c9-857ea02ae1d6', 'e6ce9767-5553-40c3-a06a-8bf07bb2fadd', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('5cbe7078-c7df-449a-acfe-e8eaec8b1ca5', '29937a53-3e0b-47a8-a705-449317199717', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('cfad3c12-346f-41d8-ab46-46e62098c8d3', 'e511c049-2b85-48b8-aa49-81f2ab18f75c', NULL, 'd25f7f6d-aeae-4043-a546-706684fedb48', 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('9ca4a66a-504a-43c0-a434-f0b49d117191', 'ddac797e-398d-4e76-ae6e-374ac08872aa', NULL, '398554b3-3386-4da5-abe7-1f0a3fb1f0b9', 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('e95cc5aa-db12-46bd-a618-b104ceafb12d', '0cc184d8-668d-45a6-a37c-b907cddd77f5', NULL, '4a4596eb-ef71-4f93-ab17-19fc68f81c3c', 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('c0852abc-f179-41c3-a3c6-93705e7d9b15', '6acaa649-859d-4df4-a197-1cb1a3f767c2', NULL, '11ed3a17-cfa0-4530-ad64-17c06d120dbb', 'thanks');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('8eeec23c-44c9-4eaa-ab7b-a6ae3f16edc7', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', NULL, '81ef2f89-3eec-4845-aa4a-250e74ed1cb6', 'amen');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('fb93ad5c-c3b6-4ff1-a1c5-ffcc200d6696', 'db94a381-17b6-4670-ac85-0c2a3e320487', '4ac226dd-b88b-4288-a858-da0c735e65ec', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('47cbbf63-3ea7-4ce5-a56d-8a8cd3746342', '6acaa649-859d-4df4-a197-1cb1a3f767c2', '4ac226dd-b88b-4288-a858-da0c735e65ec', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('8f09a7c5-5907-4b32-a843-d69016f54f92', 'ddac797e-398d-4e76-ae6e-374ac08872aa', '4ac226dd-b88b-4288-a858-da0c735e65ec', NULL, 'praying');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('ad1e8dca-cdf0-4e2d-a84d-6537cb75df63', '9f80a4c5-3140-4fd0-aa40-5ff512a8975e', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'heart');
INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES ('f10f3fb1-935f-4eb3-ab83-aa924baef7dc', '741bc6aa-de7e-4020-aff2-bd5c1f29d481', 'b8767199-4e2b-47fe-a884-a3f56b19b621', NULL, 'heart');

COMMIT;

-- ==========================================================================
-- End of seed data
-- ==========================================================================
