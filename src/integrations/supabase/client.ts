// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tgsdpushspozizzztedt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnc2RwdXNoc3Bveml6enp0ZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzE3ODksImV4cCI6MjA1OTEwNzc4OX0.WCzWN5FClbuS3rYNoJhuddyuCqyK9YF1wfcpnn8j-G8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);