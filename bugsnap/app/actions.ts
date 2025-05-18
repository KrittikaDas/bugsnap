"use server"

import { revalidatePath } from "next/cache"
import { createIssue, updateIssue, deleteIssue } from "@/lib/db"

export async function createIssueAction(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as string
  const assignee = formData.get("assignee") as string
  const environment = formData.get("environment") as string
  const browser = formData.get("browser") as string

  if (!title) {
    return { error: "Title is required" }
  }

  const newIssue = {
    title,
    description,
    priority,
    assignee: assignee || "Unassigned",
    status: "open",
    environment,
    browser,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const issue = await createIssue(newIssue)

  if (!issue) {
    return { error: "Failed to create issue" }
  }

  revalidatePath("/issues")
  revalidatePath("/")

  return { success: true, issue }
}

export async function updateIssueAction(id: string, formData: FormData) {
  const updates: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    if (value) {
      updates[key] = value
    }
  }

  updates.updated_at = new Date().toISOString()

  const issue = await updateIssue(id, updates)

  if (!issue) {
    return { error: "Failed to update issue" }
  }

  revalidatePath(`/issues/${id}`)
  revalidatePath("/issues")
  revalidatePath("/")

  return { success: true, issue }
}

export async function deleteIssueAction(id: string) {
  const success = await deleteIssue(id)

  if (!success) {
    return { error: "Failed to delete issue" }
  }

  revalidatePath("/issues")
  revalidatePath("/")

  return { success: true }
}
