// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bcqysoltcfyghepbwufj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcXlzb2x0Y2Z5Z2hlcGJ3dWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNDg5NDQsImV4cCI6MjA1MTcyNDk0NH0.YaO3vZ_uNGO4uKshCKsKnAGdUVDGfx5ngy8qymUI7eQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);