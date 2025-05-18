"use client"

import { format } from "date-fns"
import { Bug, CheckCircle2, GitPullRequest, User } from "lucide-react"

type Activity = {
  id: string
  type: "issue_created" | "issue_resolved" | "test_run" | "pull_request" | "user_joined"
  description: string
  user: string
  timestamp: Date
}

const mockActivities: Activity[] = [
  {
    id: "act-1",
    type: "issue_created",
    description: "Created issue ISSUE-1001: Login page throws 500 error on Safari",
    user: "Sarah Chen",
    timestamp: new Date(2023, 4, 15, 14, 30),
  },
  {
    id: "act-2",
    type: "test_run",
    description: "Ran UI tests: 42 passed, 3 failed",
    user: "CI/CD Pipeline",
    timestamp: new Date(2023, 4, 15, 13, 45),
  },
  {
    id: "act-3",
    type: "pull_request",
    description: "Merged PR #123: Fix navigation menu on mobile",
    user: "Emma Johnson",
    timestamp: new Date(2023, 4, 15, 11, 20),
  },
  {
    id: "act-4",
    type: "issue_resolved",
    description: "Resolved issue ISSUE-1004: Mobile navigation menu doesn't close",
    user: "Emma Johnson",
    timestamp: new Date(2023, 4, 15, 10, 15),
  },
  {
    id: "act-5",
    type: "user_joined",
    description: "Joined the project team",
    user: "Michael Brown",
    timestamp: new Date(2023, 4, 14, 9, 0),
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {mockActivities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="mr-4 flex items-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(activity.type)}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityIcon(type: Activity["type"]) {
  switch (type) {
    case "issue_created":
      return <Bug className="h-4 w-4" />
    case "issue_resolved":
      return <CheckCircle2 className="h-4 w-4" />
    case "pull_request":
      return <GitPullRequest className="h-4 w-4" />
    case "user_joined":
      return <User className="h-4 w-4" />
    default:
      return <Bug className="h-4 w-4" />
  }
}
