
(function () {
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));

  function client() {
    if (typeof getSupabase === "function") return getSupabase();
    if (window.supabaseClient) return window.supabaseClient;
    if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
      window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
      return window.supabaseClient;
    }
    throw new Error("Supabase client is not configured.");
  }

  async function fetchApprovedReviews() {
    const sb = client();
    const result = await sb.from("reviews")
      .select("created_at,nameName,location,rating,review,status")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (result.error) throw result.error;
    return result.data || [];
  }

  function renderReviews(list, data) {
    if (!list) return;
    if (!data.length) {
      list.innerHTML = '<div class="review-empty">No approved reviews yet.</div>';
      return;
    }
    list.innerHTML = data.map(r => {
      const n = Math.max(0, Math.min(5, Number(r.rating) || 0));
      const stars = "★".repeat(n) + "☆".repeat(5-n);
      return `<article class="review-card">
        <div class="review-top">
          <div><div class="review-name">${esc(r.nameName || "Anonymous")}</div>
          <div class="review-location">${esc(r.location || "")}</div></div>
          <div class="review-stars">${stars}</div>
        </div>
        <div class="review-text">${esc(r.review || "")}</div>
        <div class="review-date">${r.created_at ? esc(new Date(r.created_at).toLocaleDateString()) : ""}</div>
      </article>`;
    }).join("");
  }

  window.loadApprovedReviews = async function (selector) {
    const list = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!list) return;
    list.innerHTML = '<div class="review-empty">Loading reviews...</div>';
    try {
      const data = await fetchApprovedReviews();
      renderReviews(list, data);
    } catch (e) {
      console.error("Reviews load error:", e);
      list.innerHTML = '<div class="review-empty">Reviews could not be loaded: ' + esc(e.message) + '</div>';
    }
  };

  window.setupReviewForm = function (form) {
    if (!form || form.dataset.reviewReady === "1") return;
    form.dataset.reviewReady = "1";

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const msg = form.querySelector(".review-status") || document.getElementById("reviewMsg");
      if (btn) { btn.disabled = true; btn.textContent = "Submitting..."; }

      try {
        const name = (form.querySelector('[name="name"],#reviewName')?.value || "").trim();
        const location = (form.querySelector('[name="location"],#reviewLocation')?.value || "").trim();
        const rating = Number(form.querySelector('[name="rating"],#reviewRating')?.value || 0);
        const review = (form.querySelector('[name="review"],#reviewText')?.value || "").trim();

        if (!name || !rating || !review) throw new Error("Please complete your name, rating and review.");

        const { error } = await client().from("reviews").insert([{
          nameName: name,
          location: location || null,
          rating,
          review,
          status: "pending"
        }]);
        if (error) throw error;

        if (msg) {
          msg.textContent = "Thank you! Your review has been submitted and is waiting for approval.";
          msg.style.display = "block";
          msg.style.background = "#e9f8ee";
          msg.style.color = "#126b35";
        }
        form.reset();
      } catch (err) {
        console.error("Review submit error:", err);
        if (msg) {
          msg.textContent = "Review could not be submitted: " + (err.message || "Unknown error");
          msg.style.display = "block";
          msg.style.background = "#fff0f0";
          msg.style.color = "#a31d1d";
        }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = "Submit Review"; }
      }
    });
  };
})();
