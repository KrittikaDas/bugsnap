import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient()
  const data = await request.json()

  // Validate required fields
  if (!data.issue_id || !data.content) {
    return NextResponse.json({ error: "Issue ID and content are required" }, { status: 400 })
  }

  const { data: newComment, error } = await supabase
    .from("comments")
    .insert([
      {
        issue_id: data.issue_id,
        user_id: data.user_id || null,
        content: data.content,
      },
    ])
    .select(`
      *,
      user:user_id(id, name, email, avatar_url)
    `)

  if (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }

  return NextResponse.json(newComment[0], { status: 201 })
}
