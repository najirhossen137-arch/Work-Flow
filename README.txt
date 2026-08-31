WORK FLOW PROFESSIONAL RECRUITMENT PORTAL

1. Upload this folder to GitHub and redeploy on Vercel.
2. In Supabase Dashboard -> SQL Editor, run work_flow_portal.sql ONCE.
3. Auth -> Email provider should be enabled for Login/Sign Up.
4. To create an employer: sign up normally, then an existing admin can run:
   update public.profiles set role='employer' where id='USER_UUID';
5. Candidate flow: Login -> Jobs -> Job Details -> Apply -> Candidate details + CV -> Application ID -> Dashboard.
6. Employer flow: Employer Dashboard -> Company -> Post Job -> Applicants -> Status -> Candidate notification.
7. Applications and CV storage are protected by RLS/storage policies. Never put a Supabase service_role key in frontend code.
