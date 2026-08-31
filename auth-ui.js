// Work Flow shared authentication UI
(async function(){
  try {
    const client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    const { data } = await client.auth.getSession();
    const user = data?.session?.user;
    const login = document.getElementById('loginBtn');
    const signup = document.getElementById('signupBtn');
    const userEl = document.getElementById('authUser');
    const logout = document.getElementById('logoutBtn');
    const nav = document.getElementById('authNav');
    if (!nav) return;
    if (user) {
      if (login) login.style.display = 'none';
      if (signup) signup.style.display = 'none';
      if (userEl) {
        userEl.textContent = '👤 ' + (user.user_metadata?.full_name || user.email || 'Account');
        userEl.style.display = 'inline-flex';
        userEl.style.maxWidth = '180px';
        userEl.style.overflow = 'hidden';
        userEl.style.textOverflow = 'ellipsis';
        userEl.style.whiteSpace = 'nowrap';
      }
      if (logout) {
        logout.style.display = 'inline-flex';
        logout.onclick = async () => { await client.auth.signOut(); location.href = 'login.html'; };
      }
      if (!document.getElementById('dashboardBtn')) {
        const a = document.createElement('a');
        a.id = 'dashboardBtn'; a.className = 'btn outline-dark'; a.href = 'dashboard.html';
        a.textContent = '👤 Dashboard'; nav.insertBefore(a, nav.querySelector('.dark'));
      }
    } else {
      if (login) login.style.display = 'inline-flex';
      if (signup) signup.style.display = 'inline-flex';
      if (userEl) userEl.style.display = 'none';
      if (logout) logout.style.display = 'none';
      const d = document.getElementById('dashboardBtn'); if (d) d.remove();
    }
  } catch (e) { console.warn('Work Flow auth UI:', e); }
})();
