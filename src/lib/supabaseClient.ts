import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fuvqsfrfkbrgswvfnnot.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dnFzZnJma2JyZ3N3dmZubm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzc5NDAsImV4cCI6MjA2NzExMzk0MH0.ZOdLH7kuk9aBVRaQhRX1EMPCj_YauHRUpDvjZ6Y8lpk"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase