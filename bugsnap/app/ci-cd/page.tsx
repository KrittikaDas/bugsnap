import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, GitBranch, GitCommit, GitPullRequest } from "lucide-react"

export default function CICDPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">CI/CD Pipeline</h1>
          <p className="text-muted-foreground">View and manage continuous integration and deployment workflows</p>
        </div>

        <div className="max-w-6xl w-full mx-auto grid gap-6">
          <Tabs defaultValue="workflows" className="space-y-4">
            <TabsList>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            <TabsContent value="workflows" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workflow Runs</CardTitle>
                  <CardDescription>GitHub Actions workflow runs for the project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_100px_150px_120px] gap-2 p-4 font-medium border-b">
                      <div>Workflow</div>
                      <div>Branch</div>
                      <div>Commit</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-[1fr_100px_150px_120px] gap-2 p-4 items-center">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                          <span>CI/CD Pipeline</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">main</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono">a1b2c3d</span>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_100px_150px_120px] gap-2 p-4 items-center">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                          <span>UI Tests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">feature</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono">e5f6g7h</span>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_100px_150px_120px] gap-2 p-4 items-center">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                          <span>API Tests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">feature</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono">e5f6g7h</span>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1fr_100px_150px_120px] gap-2 p-4 items-center">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                          <span>Deploy Preview</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">feature</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono">e5f6g7h</span>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Success
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>GitHub Actions Configuration</CardTitle>
                  <CardDescription>CI/CD workflow configuration files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Main CI/CD Workflow</h3>
                      <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                        {`# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: .next/

  ui-tests:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm run test:e2e
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  api-tests:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run API tests
        run: npm run test:api
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: api-test-results
          path: api-test-results/

  deploy:
    needs: [ui-tests, api-tests]
    if: github.ref == 'refs/heads/main' && success()
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-output
          path: .next/
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Playwright Configuration</h3>
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
