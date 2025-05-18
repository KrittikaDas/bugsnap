-- Seed data for BugSnap application

-- Clear existing data (if needed)
TRUNCATE users, issues, comments, test_runs, test_results CASCADE;

-- Reset sequences
ALTER SEQUENCE issues_issue_number_seq RESTART WITH 1001;

-- Insert sample users
INSERT INTO users (id, email, name, avatar_url, created_at, updated_at)
VALUES 
  ('d0d8c19c-3b3e-4f5a-a1b2-c3d4e5f6a7b8', 'sarah.chen@example.com', 'Sarah Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', NOW(), NOW()),
  ('e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', 'john.smith@example.com', 'John Smith', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', NOW(), NOW()),
  ('f2f0e31e-5d5g-6h7c-c3d4-e5f6a7b8c9d0', 'emma.johnson@example.com', 'Emma Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', NOW(), NOW());

-- Insert sample issues
INSERT INTO issues (id, issue_number, title, description, status, priority, reporter_id, assignee_id, environment, browser, created_at, updated_at)
VALUES 
  ('b4b2g53g-7f7i-8j9e-e5f6-a7b8c9d0e1f2', 1001, 'Login page throws 500 error on Safari', 'When attempting to log in using Safari browser (version 15.4), the login page throws a 500 error. This doesn''t happen on Chrome or Firefox.', 'open', 'high', 'f2f0e31e-5d5g-6h7c-c3d4-e5f6a7b8c9d0', 'd0d8c19c-3b3e-4f5a-a1b2-c3d4e5f6a7b8', 'Production', 'Safari 15.4', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
  ('c5c3h64h-8g8j-9k0f-f6a7-b8c9d0e1f2g3', 1002, 'Dashboard charts not rendering on Firefox', 'The charts on the dashboard page are not rendering correctly when using Firefox.', 'in-progress', 'medium', 'e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', 'e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', 'Production', 'Firefox 102', NOW() - INTERVAL '3 days', NOW() - INTERVAL '12 hours'),
  ('d6d4i75i-9h9k-0l1g-g7b8-c9d0e1f2g3h4', 1003, 'API rate limiting not working correctly', 'The API rate limiting middleware is not properly throttling requests as expected.', 'open', 'critical', 'e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', NULL, 'Development', 'N/A', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Insert sample comments
INSERT INTO comments (id, issue_id, user_id, content, created_at, updated_at)
VALUES 
  ('f8f6k97k-1j1m-2n3i-i9d0-e1f2g3h4i5j6', 'b4b2g53g-7f7i-8j9e-e5f6-a7b8c9d0e1f2', 'd0d8c19c-3b3e-4f5a-a1b2-c3d4e5f6a7b8', 'I''ve reproduced this issue on Safari 15.4. It seems to be related to the authentication flow.', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  ('g9g7l08l-2k2n-3o4j-j0e1-f2g3h4i5j6k7', 'b4b2g53g-7f7i-8j9e-e5f6-a7b8c9d0e1f2', 'e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', 'I''ll take a look at this. Could be related to the recent changes in the auth middleware.', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours'),
  ('h0h8m19m-3l3o-4p5k-k1f2-g3h4i5j6k7l8', 'c5c3h64h-8g8j-9k0f-f6a7-b8c9d0e1f2g3', 'e1e9d20d-4c4f-5g6b-b2c3-d4e5f6a7b8c9', 'I''m working on this now. The issue appears to be with the chart library we''re using.', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours');

-- Insert sample test runs
INSERT INTO test_runs (id, name, type, total_tests, passed_tests, failed_tests, skipped_tests, duration_seconds, commit_hash, branch_name, created_at)
VALUES 
  ('i1i9n20n-4m4p-5q6l-l2g3-h4i5j6k7l8m9', 'UI Tests - Main Branch', 'ui', 45, 42, 3, 0, 124, 'a1b2c3d', 'main', NOW() - INTERVAL '6 hours'),
  ('j2j0o31o-5n5q-6r7m-m3h4-i5j6k7l8m9n0', 'API Tests - Main Branch', 'api', 78, 76, 2, 0, 45, 'a1b2c3d', 'main', NOW() - INTERVAL '6 hours'),
  ('k3k1p42p-6o6r-7s8n-n4i5-j6k7l8m9n0o1', 'UI Tests - Feature Branch', 'ui', 45, 40, 3, 2, 118, 'e5f6g7h', 'feature', NOW() - INTERVAL '1 day');

-- Insert sample test results
INSERT INTO test_results (id, test_run_id, test_name, file_path, status, duration_ms, error_message, created_at)
VALUES 
  ('m5m3r64r-8q8t-9u0p-p6k7-l8m9n0o1p2q3', 'i1i9n20n-4m4p-5q6l-l2g3-h4i5j6k7l8m9', 'login page should display correctly', 'tests/example-ui.test.ts:4', 'passed', 1250, NULL, NOW() - INTERVAL '6 hours'),
  ('n6n4s75s-9r9u-0v1q-q7l8-m9n0o1p2q3r4', 'i1i9n20n-4m4p-5q6l-l2g3-h4i5j6k7l8m9', 'user can login with valid credentials', 'tests/example-ui.test.ts:15', 'passed', 2340, NULL, NOW() - INTERVAL '6 hours'),
  ('o7o5t86t-0s0v-1w2r-r8m9-n0o1p2q3r4s5', 'i1i9n20n-4m4p-5q6l-l2g3-h4i5j6k7l8m9', 'dashboard is responsive', 'tests/example-ui.test.ts:45', 'failed', 1890, 'Expected element to be visible but it was not', NOW() - INTERVAL '6 hours');