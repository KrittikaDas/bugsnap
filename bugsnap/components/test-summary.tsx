"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CheckCircle2, XCircle } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TestRun = {
  id: string
  name: string
  type: "ui" | "api"
  total_tests: number
  passed_tests: number
  failed_tests: number
  skipped_tests: number
  duration_seconds: number
  commit_hash: string | null
  branch_name: string | null
  created_at: string
}

export function TestSummary() {
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestRuns() {
      try {
        const response = await fetch("/api/test-runs")
        if (!response.ok) throw new Error("Failed to fetch test runs")

        const data = await response.json()
        setTestRuns(data)
      } catch (error) {
        console.error("Error fetching test runs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestRuns()
  }, [])

  if (loading) {
    return <div className="py-4 text-center text-muted-foreground">Loading test runs...</div>
  }

  if (testRuns.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No test runs found</div>
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Tests</TabsTrigger>
        <TabsTrigger value="ui">UI Tests</TabsTrigger>
        <TabsTrigger value="api">API Tests</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <TestRunTable testRuns={testRuns} />
      </TabsContent>
      <TabsContent value="ui">
        <TestRunTable testRuns={testRuns.filter((run) => run.type === "ui")} />
      </TabsContent>
      <TabsContent value="api">
        <TestRunTable testRuns={testRuns.filter((run) => run.type === "api")} />
      </TabsContent>
    </Tabs>
  )
}

function TestRunTable({ testRuns }: { testRuns: TestRun[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Run</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pass Rate</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testRuns.map((run) => (
            <TableRow key={run.id}>
              <TableCell className="font-medium">{run.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{run.type === "ui" ? "UI" : "API"}</Badge>
              </TableCell>
              <TableCell>
                {run.failed_tests === 0 ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Passed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="mr-1 h-3 w-3" />
                    Failed
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={(run.passed_tests / run.total_tests) * 100} className="h-2 w-[60px]" />
                  <span className="text-xs text-muted-foreground">
                    {Math.round((run.passed_tests / run.total_tests) * 100)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>{run.duration_seconds}s</TableCell>
              <TableCell className="text-right">
                {format(new Date(run.created_at), "MMM d, yyyy 'at' h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
