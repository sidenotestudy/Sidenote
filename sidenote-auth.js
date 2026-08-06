// ============================================================
// Sidenote — shared Supabase client + auth helpers
// Include this AFTER the Supabase CDN script on every page that
// needs login state (landing page, dashboard.html).
// ============================================================

const SUPABASE_URL = 'https://wxbvhxuiekiznduvlfha.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YnZoeHVpZWtpem5kdXZsZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3OTM2OTQsImV4cCI6MjEwMTM2OTY5NH0.Iv-2tzhoL43nfEcx08d-Wt-iakUbschbgvtopeyAUWY';

const sidenoteClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SidenoteAuth = {
  client: sidenoteClient,

  async signUp(email, password) {
    return await sidenoteClient.auth.signUp({ email, password });
  },

  async signIn(email, password) {
    return await sidenoteClient.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return await sidenoteClient.auth.signOut();
  },

  async getUser() {
    const { data: { user } } = await sidenoteClient.auth.getUser();
    return user;
  },

  // Call on pages that require login. Redirects to the landing
  // page (with the login modal auto-opened) if nobody's signed in.
  async requireAuth() {
    const user = await this.getUser();
    if (!user) {
      window.location.href = 'index.html?login=1';
      return null;
    }
    return user;
  }
};