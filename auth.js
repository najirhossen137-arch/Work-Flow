function sb() {
  if (
    !window.supabase ||
    !window.SUPABASE_URL ||
    !window.SUPABASE_ANON_KEY
  ) {
    throw new Error("Supabase configuration is missing.");
  }

  return window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
}

function msg(text, type = "success") {
  const el = document.getElementById("message");

  if (!el) return;

  el.textContent = text;
  el.className = "message " + type;
  el.style.display = "block";
}

function togglePassword() {
  const input = document.getElementById("password");

  if (input) {
    input.type =
      input.type === "password" ? "text" : "password";
  }
}


/* =========================
   LOGIN
========================= */

async function doLogin(e) {
  e.preventDefault();

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;

  try {
    const { error } =
      await sb().auth.signInWithPassword({
        email: email,
        password: password
      });

    if (error) throw error;

    msg("Login successful. Redirecting…");

    const next =
      new URLSearchParams(location.search).get("next");

    setTimeout(() => {
      location.href = next || "profile.html";
    }, 700);

  } catch (err) {
    msg(
      err.message ||
      "Login failed. Please check your details.",
      "error"
    );
  }
}


/* =========================
   SIGN UP
========================= */

async function doSignup(e) {
