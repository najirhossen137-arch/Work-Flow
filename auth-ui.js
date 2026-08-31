// Work Flow shared authentication UI
(async function () {
  async function updateAuthUI() {
    try {
      if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return;
      const nav = document.getElementById('authNav');
      if (!nav) return;
      const client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
      const { data } = await client.auth.getSession();
      const user = data?.session?.user;
      const login = document.getElementById('loginBtn');
      const signup = document.getElementById('signupBtn');
      const userEl = document.getElementById('authUser');
      const logout = document.getElementById('logoutBtn');

      let dashboard = document.getElementById('dashboardBtn');
      if (user) {
        if (login) login.style.display = 'none';
        if (signup) signup.style.display = 'none';
        if (userEl) {
          userEl.textContent = '👤 ' + (user.user_metadata?.full_name || 'Account');
          userEl.style.display = 'inline-flex';
          userEl.style.maxWidth = '180px';
          userEl.style.overflow = 'hidden';
          userEl.style.textOverflow = 'ellipsis';
          userEl.style.whiteSpace = 'nowrap';
          userEl.style.cursor = 'pointer';
          userEl.title = 'Account: ' + (user.email || '') + ' — Open Candidate Dashboard';
          userEl.onclick = () => { location.href = 'dashboard.html'; };
        }
        if (dashboard) dashboard.style.display = 'inline-flex';
        if (!dashboard) {
          dashboard = document.createElement('a');
          dashboard.id = 'dashboardBtn';
          dashboard.className = 'btn outline-dark';
          dashboard.href = 'dashboard.html';
          dashboard.textContent = '👤 Dashboard';
          const wa = nav.querySelector('a[href*="wa.me"]') || nav.lastElementChild;
          nav.insertBefore(dashboard, wa);
        }
        if (logout) {
          logout.style.display = 'inline-flex';
          logout.onclick = async () => {
            await client.auth.signOut();
            location.href = 'index.html';
          };
        }
      } else {
        if (login) login.style.display = 'inline-flex';
        if (signup) signup.style.display = 'inline-flex';
        if (userEl) userEl.style.display = 'none';
        if (logout) logout.style.display = 'none';
        if (dashboard) { dashboard.style.display = 'none'; }
      }
    } catch (e) {
      console.warn('Work Flow auth UI:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI, { once: true });
  } else {
    updateAuthUI();
  }
  window.addEventListener('pageshow', updateAuthUI);
})();
