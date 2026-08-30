WORK FLOW - FIXED REVIEW VERSION

1. Replace the files in the GitHub repository root with this package.
2. In Supabase SQL Editor, run supabase_reviews_policies.sql.
3. Wait for Vercel to redeploy.
4. Submit a review: it will be pending.
5. Open /admin.html and log in with a Supabase Auth account.
6. Approve the review, then refresh the public site.

IMPORTANT: Never put a Supabase secret/service_role key in browser files.
The included admin policy allows authenticated users to manage reviews; for production, restrict it to a dedicated admin role.
