"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { AlertCircle, ChevronLeft, Clock, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"

type Comment = {
  id: string
  user: string
  content: string
  timestamp: Date
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      user: "Sarah Chen",
      content: "I've reproduced this issue on Safari 15.4. It seems to be related to the authentication flow.",
      timestamp: new Date(2023, 4, 15, 15, 30),
    },
    {
      id: "comment-2",
      user: "John Smith",
      content: "I'll take a look at this. Could be related to the recent changes in the auth middleware.",
      timestamp: new Date(2023, 4, 15, 16, 45),
    },
  ])

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `comment-${comments.length + 1}`,
      user: "User",
      content: newComment,
      timestamp: new Date(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  // Mock issue data - in a real app this would be fetched from an API
  const issue = {
    id: params.id,
    title: "Login page throws 500 error on Safari",
    description:
      "When attempting to log in using Safari browser (version 15.4), the login page throws a 500 error. This doesn't happen on Chrome or Firefox. The error occurs after submitting the login form.\n\nSteps to reproduce:\n1. Open Safari browser\n2. Navigate to login page\n3. Enter credentials\n4. Click login button\n\nExpected: User is logged in and redirected to dashboard\nActual: 500 error page is displayed",
    status: "open",
    priority: "high",
    assignee: "Sarah Chen",
    reporter: "Emma Johnson",
    createdAt: new Date(2023, 4, 15, 14, 30),
    updatedAt: new Date(2023, 4, 15, 16, 45),
    environment: "Production",
    browser: "Safari 15.4",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-1">
          <Link
            href="/issues"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Issues
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{issue.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {issue.id} • Reported by {issue.reporter} on {format(issue.createdAt, "MMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Open
                  </Badge>
                  <Badge variant="default">High Priority</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Description</h3>
                <div className="text-sm whitespace-pre-line">{issue.description}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Assignee</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt={issue.assignee} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issue.assignee}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Updated {format(issue.updatedAt, "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Environment</h3>
                  <span className="text-sm">{issue.environment}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Browser/Device</h3>
                  <span className="text-sm">{issue.browser}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={comment.user} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(comment.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <form onSubmit={handleAddComment} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newComment.trim()}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
