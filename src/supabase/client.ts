import { createClient } from "@supabase/supabase-js";

// مطمئن ش این کلید کامل و درسته
const supabaseUrl = "https://ucmqnipnxuakhpcioopc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbXFuaXBueHVha2hwY2lvb3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODg1NDcsImV4cCI6MjA3OTk2NDU0N30.YJ4C6SvL96H73bFbboEWEr8DoS2c7n7VRVEOoZn9iAY"; // کلید کامل رو بذار

export const supabase = createClient(supabaseUrl, supabaseKey);
