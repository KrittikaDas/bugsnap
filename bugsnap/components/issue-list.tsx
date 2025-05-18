"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Issue = {
  id: string
  issue_number: number
  title: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high" | "critical"
  assignee: {
    id: string
    name: string
  } | null
  created_at: string
}

interface IssueListProps {
  limit?: number
}

export function IssueList({ limit }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch("/api/issues")
        if (!response.ok) throw new Error("Failed to fetch issues")

        let data = await response.json()

        // Apply limit if specified
        if (limit && data.length > limit) {
          data = data.slice(0, limit)
        }

        setIssues(data)
      } catch (error) {
        console.error("Error fetching issues:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [limit])

  if (loading) {
    return <div className="py-4 text-center text-muted-foreground">Loading issues...</div>
  }

  if (issues.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No issues found</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link href={`/issues/${issue.id}`} className="hover:underline">
                  ISSUE-{issue.issue_number}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/issues/${issue.id}`} className="hover:underline">
                  {issue.title}
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={issue.priority} />
              </TableCell>
              <TableCell>{issue.assignee?.name || "Unassigned"}</TableCell>
              <TableCell className="text-right">{format(new Date(issue.created_at), "MMM d, yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: Issue["status"] }) {
  switch (status) {
    case "open":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="mr-1 h-3 w-3" />
          Open
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Resolved
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="mr-1 h-3 w-3" />
          Open
        </Badge>
      )
  }
}

function PriorityBadge({ priority }: { priority: Issue["priority"] }) {
  switch (priority) {
    case "low":
      return <Badge variant="secondary">Low</Badge>
    case "medium":
      return <Badge variant="outline">Medium</Badge>
    case "high":
      return <Badge variant="default">High</Badge>
    case "critical":
      return <Badge variant="destructive">Critical</Badge>
    default:
      return <Badge variant="outline">Medium</Badge>
  }
}
