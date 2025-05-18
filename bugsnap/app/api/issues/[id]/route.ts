import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()

  const { data: issue, error } = await supabase
    .from("issues")
    .select(`
      *,
      reporter:reporter_id(id, name, email, avatar_url),
      assignee:assignee_id(id, name, email, avatar_url),
      comments(*, user:user_id(id, name, email, avatar_url))
    `)
    .eq("id", params.id)
    .single()

  if (error) {
    console.error(`Error fetching issue ${params.id}:`, error)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })
  }

  return NextResponse.json(issue)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()
  const data = await request.json()

  // Update the issue
  const { data: updatedIssue, error } = await supabase
    .from("issues")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()

  if (error) {
    console.error(`Error updating issue ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update issue" }, { status: 500 })
  }

  if (!updatedIssue.length) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })
  }

  return NextResponse.json(updatedIssue[0])
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("issues").delete().eq("id", params.id)

  if (error) {
    console.error(`Error deleting issue ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
