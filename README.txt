WORK FLOW - FINAL SUPABASE REVIEW VERSION

Files:
- index.html
- jobs.html
- reviews.html
- admin.html
- reviews.js
- supabase-config.js
- logo.png
- supabase_reviews_policies.sql

FLOW:
1. Customer submits a review -> status is pending.
2. Admin opens admin.html -> Approve or Reject.
3. Approved reviews appear on index.html and reviews.html.

IMPORTANT:
- Keep Supabase RLS enabled.
- The browser uses the Publishable key, not a secret key.
- Make sure public INSERT, SELECT and (for admin actions) UPDATE policies match your intended security model.
- Replace the files in the GitHub repository root, then wait for Vercel to redeploy.
