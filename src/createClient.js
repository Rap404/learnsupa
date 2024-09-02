import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://wnvatkdtjgljktdbkwln.supabase.co"
    , 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudmF0a2R0amdsamt0ZGJrd2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMTMxNjMsImV4cCI6MjA0MDU4OTE2M30.u57Zuf5VLO-wwkstREMw7WWx_dCTIYdGFhh2acDl_qI"
)