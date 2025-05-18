import { DashboardHeader } from "@/components/dashboard-header"
import { TestSummary } from "@/components/test-summary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TestsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Test Results</h1>
          <p className="text-muted-foreground">View and analyze automated test results from UI and API tests</p>
        </div>

        <div className="max-w-6xl w-full mx-auto grid gap-6">
          <Tabs defaultValue="results" className="space-y-4">
            <TabsList>
              <TabsTrigger value="results">Test Results</TabsTrigger>
              <TabsTrigger value="config">Test Configuration</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="space-y-4">
              <TestSummary />
            </TabsContent>
            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Configuration</CardTitle>
                  <CardDescription>Configure how tests are run in the CI/CD pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">UI Tests</CardTitle>
                          <CardDescription>Playwright configuration</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                            {`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});`}
                          </pre>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">API Tests</CardTitle>
                          <CardDescription>Postman collection configuration</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                            {`// postman-collection.json (excerpt)
{
  "info": {
    "name": "BugSnap API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Issues API",
      "item": [
        {
          "name": "Get All Issues",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/api/issues"
          }
        },
        {
          "name": "Create Issue",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/api/issues",
            "body": {
              "mode": "raw",
              "raw": "{ ... }"
            }
          }
        }
      ]
    }
  ]
}`}
                          </pre>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
