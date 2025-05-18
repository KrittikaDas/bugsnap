import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient()
  const searchParams = request.nextUrl.searchParams
  const testRunId = searchParams.get("test_run_id")

  let query = supabase.from("test_results").select("*")

  if (testRunId) {
    query = query.eq("test_run_id", testRunId)
  }

  const { data: testResults, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching test results:", error)
    return NextResponse.json({ error: "Failed to fetch test results" }, { status: 500 })
  }

  return NextResponse.json(testResults)
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient()
  const data = await request.json()

  // Validate required fields
  if (!data.test_run_id || !data.test_name || !data.status) {
    return NextResponse.json({ error: "Test run ID, test name, and status are required" }, { status: 400 })
  }

  const { data: newTestResult, error } = await supabase
    .from("test_results")
    .insert([
      {
        test_run_id: data.test_run_id,
        test_name: data.test_name,
        file_path: data.file_path || null,
        status: data.status,
        duration_ms: data.duration_ms || 0,
        error_message: data.error_message || null,
        stack_trace: data.stack_trace || null,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating test result:", error)
    return NextResponse.json({ error: "Failed to create test result" }, { status: 500 })
  }

  return NextResponse.json(newTestResult[0], { status: 201 })
}
