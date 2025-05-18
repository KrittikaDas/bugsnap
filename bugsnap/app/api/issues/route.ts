import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = getSupabaseServerClient()

  const { data: issues, error } = await supabase
    .from("issues")
    .select(`
      *,
      reporter:reporter_id(id, name, email, avatar_url),
      assignee:assignee_id(id, name, email, avatar_url)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching issues:", error)
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 })
  }

  return NextResponse.json(issues)
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient()
  const data = await request.json()

  // Validate required fields
  if (!data.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  const { data: newIssue, error } = await supabase
    .from("issues")
    .insert([
      {
        title: data.title,
        description: data.description || "",
        status: data.status || "open",
        priority: data.priority || "medium",
        reporter_id: data.reporter_id || null,
        assignee_id: data.assignee_id || null,
        environment: data.environment || "Not specified",
        browser: data.browser || "Not specified",
      },
    ])
    .select()

  if (error) {
    console.error("Error creating issue:", error)
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 })
  }

  return NextResponse.json(newIssue[0], { status: 201 })
}
