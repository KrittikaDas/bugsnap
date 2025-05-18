import { test, expect } from "@playwright/test"

// Example API tests for the issues endpoints
test("GET /api/issues returns a list of issues", async ({ request }) => {
  const response = await request.get("/api/issues")

  // Verify response status
  expect(response.status()).toBe(200)

  // Verify response body
  const issues = await response.json()
  expect(Array.isArray(issues)).toBeTruthy()
  expect(issues.length).toBeGreaterThan(0)

  // Verify issue structure
  const issue = issues[0]
  expect(issue).toHaveProperty("id")
  expect(issue).toHaveProperty("title")
  expect(issue).toHaveProperty("status")
  expect(issue).toHaveProperty("priority")
})

test("GET /api/issues/:id returns a specific issue", async ({ request }) => {
  // First get all issues to find a valid ID
  const allResponse = await request.get("/api/issues")
  const issues = await allResponse.json()
  const issueId = issues[0].id

  // Get the specific issue
  const response = await request.get(`/api/issues/${issueId}`)

  // Verify response status
  expect(response.status()).toBe(200)

  // Verify response body
  const issue = await response.json()
  expect(issue).toHaveProperty("id", issueId)
  expect(issue).toHaveProperty("title")
  expect(issue).toHaveProperty("description")
})

test("POST /api/issues creates a new issue", async ({ request }) => {
  const newIssue = {
    title: "API Test Issue",
    description: "This issue was created by an API test",
    priority: "medium",
    status: "open",
  }

  const response = await request.post("/api/issues", { data: newIssue })

  // Verify response status
  expect(response.status()).toBe(201)

  // Verify response body
  const createdIssue = await response.json()
  expect(createdIssue).toHaveProperty("id")
  expect(createdIssue).toHaveProperty("title", newIssue.title)
  expect(createdIssue).toHaveProperty("description", newIssue.description)
  expect(createdIssue).toHaveProperty("priority", newIssue.priority)
  expect(createdIssue).toHaveProperty("status", newIssue.status)
  expect(createdIssue).toHaveProperty("createdAt")
})

test("PUT /api/issues/:id updates an existing issue", async ({ request }) => {
  // First create an issue to update
  const newIssue = {
    title: "Issue to Update",
    description: "This issue will be updated",
    priority: "low",
    status: "open",
  }

  const createResponse = await request.post("/api/issues", { data: newIssue })
  const createdIssue = await createResponse.json()

  // Update the issue
  const updatedData = {
    title: "Updated Issue Title",
    status: "in-progress",
  }

  const updateResponse = await request.put(`/api/issues/${createdIssue.id}`, {
    data: updatedData,
  })

  // Verify response status
  expect(updateResponse.status()).toBe(200)

  // Verify response body
  const updatedIssue = await updateResponse.json()
  expect(updatedIssue).toHaveProperty("id", createdIssue.id)
  expect(updatedIssue).toHaveProperty("title", updatedData.title)
  expect(updatedIssue).toHaveProperty("status", updatedData.status)
  expect(updatedIssue).toHaveProperty("description", createdIssue.description)
})

test("DELETE /api/issues/:id deletes an issue", async ({ request }) => {
  // First create an issue to delete
  const newIssue = {
    title: "Issue to Delete",
    description: "This issue will be deleted",
    priority: "low",
    status: "open",
  }

  const createResponse = await request.post("/api/issues", { data: newIssue })
  const createdIssue = await createResponse.json()

  // Delete the issue
  const deleteResponse = await request.delete(`/api/issues/${createdIssue.id}`)

  // Verify response status
  expect(deleteResponse.status()).toBe(204)

  // Verify the issue is gone
  const getResponse = await request.get(`/api/issues/${createdIssue.id}`)
  expect(getResponse.status()).toBe(404)
})
