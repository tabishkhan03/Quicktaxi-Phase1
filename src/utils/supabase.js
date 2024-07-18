import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL;
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZW1qa3p5Y2JpdnJmcGRvenFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExOTkwMzMsImV4cCI6MjAzNjc3NTAzM30.hYFUYvbky8NReuk4a376lcXmHXj3lMCphh9nINN1PG4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
