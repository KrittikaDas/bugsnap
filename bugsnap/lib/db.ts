import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getIssues() {
  const { data, error } = await supabase.from("issues").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching issues:", error)
    return []
  }

  return data
}

export async function getIssueById(id: string) {
  const { data, error } = await supabase.from("issues").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching issue ${id}:`, error)
    return null
  }

  return data
}

export async function createIssue(issue: any) {
  const { data, error } = await supabase.from("issues").insert([issue]).select()

  if (error) {
    console.error("Error creating issue:", error)
    return null
  }

  return data[0]
}

export async function updateIssue(id: string, updates: any) {
  const { data, error } = await supabase.from("issues").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating issue ${id}:`, error)
    return null
  }

  return data[0]
}

export async function deleteIssue(id: string) {
  const { error } = await supabase.from("issues").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting issue ${id}:`, error)
    return false
  }

  return true
}
