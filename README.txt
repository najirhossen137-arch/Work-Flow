WORK FLOW - FINAL WEBSITE
===========================

Files:
- index.html            Main website
- jobs.html             Job vacancies
- reviews.html          Supabase-powered customer reviews
- admin.html            Supabase review viewer
- supabase-config.js    Supabase connection settings
- logo.png              Work Flow logo
- supabase_reviews_policies.sql  RLS helper SQL

IMPORTANT:
1. Before publishing, open supabase-config.js.
2. Put your real Supabase Project URL and Publishable/Anon key in the two values.
3. Your Supabase table must be: public.reviews
   Columns used:
   idid, created_at, nameName, location, rating, review, status
4. Reviews are inserted with status = approved so they show immediately.
5. If INSERT/SELECT policies already exist, you can keep them. The SQL file is a helper if needed.

GitHub:
- Delete the old website files from the repository.
- Extract this ZIP.
- Upload ALL files from this folder to the repository root.
- Keep the file names exactly as shown.
- Vercel will redeploy automatically.

Contact:
WhatsApp: +971 50 246 7038
Email: workflow2451@gmail.com
