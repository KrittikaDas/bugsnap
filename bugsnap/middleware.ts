import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res,
supabaseUrl: 'https://bdasvdwwauzkvyhsrcka.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYXN2ZHd3YXV6a3Z5aHNyY2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDgyNDksImV4cCI6MjA2MzA4NDI0OX0.pfRZ4k6lNlC2myevQJcLPA-RD47FbgvkfZWM7auuOcA' })

  // Refresh session if expired
  await supabase.auth.getSession()

  return res
}
