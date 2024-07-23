import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fwuywhqbwsgphzdknhin.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dXl3aHFid3NncGh6ZGtuaGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4ODc4MjMsImV4cCI6MjAzNjQ2MzgyM30.cqo1zBE7k2laZ0i5HtebajQrDPKY9B9yURhT_tcEO8w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
