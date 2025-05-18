import { test, expect } from "@playwright/test"

// Example UI test for the login page
test("login page should display correctly", async ({ page }) => {
  await page.goto("/login")

  // Check that the login form elements are visible
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
  await expect(page.getByLabel("Email")).toBeVisible()
  await expect(page.getByLabel("Password")).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible()
})

// Test for successful login
test("user can login with valid credentials", async ({ page }) => {
  await page.goto("/login")

  // Fill in login form
  await page.getByLabel("Email").fill("test@example.com")
  await page.getByLabel("Password").fill("password123")

  // Click login button and wait for navigation
  await Promise.all([page.waitForNavigation(), page.getByRole("button", { name: "Sign In" }).click()])

  // Verify we're on the dashboard page
  await expect(page).toHaveURL("/")
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()
})

// Test for issue creation
test("user can create a new issue", async ({ page }) => {
  // Assume user is already logged in
  await page.goto("/issues/new")

  // Fill in the issue form
  await page.getByLabel("Issue Title").fill("Test Issue")
  await page.getByLabel("Description").fill("This is a test issue created by Playwright")

  // Select priority
  await page.getByRole("combobox", { name: "Priority" }).click()
  await page.getByRole("option", { name: "High" }).click()

  // Submit the form
  await Promise.all([page.waitForNavigation(), page.getByRole("button", { name: "Submit Issue" }).click()])

  // Verify the issue was created
  await expect(page).toHaveURL(/\/issues\/ISSUE-\d+/)
  await expect(page.getByText("Test Issue")).toBeVisible()
})

// Test for responsive design
test("dashboard is responsive", async ({ page }) => {
  await page.goto("/")

  // Test desktop view
  await page.setViewportSize({ width: 1280, height: 800 })
  await expect(page.locator("nav").getByText("Dashboard")).toBeVisible()

  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 })

  // Check that the mobile menu is collapsed
  await expect(page.locator("nav").getByText("Dashboard")).not.toBeVisible()

  // Verify that the mobile menu button is visible
  await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible()
})
