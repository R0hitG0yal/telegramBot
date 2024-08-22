import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://hvvnierfjwymrcwuxyyk.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dm5pZXJmand5bXJjd3V4eXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyOTU0NjcsImV4cCI6MjAzOTg3MTQ2N30.omdvdPlNIjUCujbCCXvG0gWEE-7qhopaHSXHmNMmTVc";

export const supabase = createClient(supabaseUrl, supabaseKey);
