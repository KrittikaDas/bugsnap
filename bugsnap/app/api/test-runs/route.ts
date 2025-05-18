import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = getSupabaseServerClient()

  const { data: testRuns, error } = await supabase
    .from("test_runs")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching test runs:", error)
    return NextResponse.json({ error: "Failed to fetch test runs" }, { status: 500 })
  }

  return NextResponse.json(testRuns)
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient()
  const data = await request.json()

  // Validate required fields
  if (!data.name || !data.type) {
    return NextResponse.json({ error: "Name and type are required" }, { status: 400 })
  }

  const { data: newTestRun, error } = await supabase
    .from("test_runs")
    .insert([
      {
        name: data.name,
        type: data.type,
        total_tests: data.total_tests || 0,
        passed_tests: data.passed_tests || 0,
        failed_tests: data.failed_tests || 0,
        skipped_tests: data.skipped_tests || 0,
        duration_seconds: data.duration_seconds || 0,
        commit_hash: data.commit_hash || null,
        branch_name: data.branch_name || null,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating test run:", error)
    return NextResponse.json({ error: "Failed to create test run" }, { status: 500 })
  }

  return NextResponse.json(newTestRun[0], { status: 201 })
}
