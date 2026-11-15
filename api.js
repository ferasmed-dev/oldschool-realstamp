// Connects the pages to the Supabase database. No demo data: every number is real.
(function () {
  const C = window.STAMP_CONFIG || {};
  const CONFIGURED = /^https:\/\/.+/.test(C.SUPABASE_URL || "") && (C.SUPABASE_ANON_KEY || "").length > 20;

  // Storage on the phone only keeps the card's id. The stamps live in the database.
  const mem = {};
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] ?? null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } }
  };

  async function call(fn, args) {
    if (!CONFIGURED) return { ok: false, error: "not_configured" };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    let r;
    try {
      r = await fetch(C.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/rpc/" + fn, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: C.SUPABASE_ANON_KEY },
        body: JSON.stringify(args),
        signal: ctrl.signal,
        cache: "no-store"
      });
    } catch (e) {
      return { ok: false, error: "network" };
    } finally {
      clearTimeout(timer);
    }
    if (r.status === 404) return { ok: false, error: "not_setup" };      // SQL file not run yet
    if (r.status === 401 || r.status === 403) return { ok: false, error: "bad_key" };
    if (!r.ok) return { ok: false, error: "server" };
    try { return await r.json(); } catch (e) { return { ok: false, error: "server" }; }
  }

  window.API = { configured: CONFIGURED, store, call };
})();
