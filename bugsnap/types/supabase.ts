export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      issues: {
        Row: {
          id: string
          issue_number: number
          title: string
          description: string | null
          status: string
          priority: string
          reporter_id: string | null
          assignee_id: string | null
          environment: string | null
          browser: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          issue_number?: number
          title: string
          description?: string | null
          status?: string
          priority?: string
          reporter_id?: string | null
          assignee_id?: string | null
          environment?: string | null
          browser?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          issue_number?: number
          title?: string
          description?: string | null
          status?: string
          priority?: string
          reporter_id?: string | null
          assignee_id?: string | null
          environment?: string | null
          browser?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          issue_id: string
          user_id: string | null
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          issue_id: string
          user_id?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          issue_id?: string
          user_id?: string | null
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      test_runs: {
        Row: {
          id: string
          name: string
          type: string
          total_tests: number
          passed_tests: number
          failed_tests: number
          skipped_tests: number
          duration_seconds: number
          commit_hash: string | null
          branch_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          total_tests?: number
          passed_tests?: number
          failed_tests?: number
          skipped_tests?: number
          duration_seconds?: number
          commit_hash?: string | null
          branch_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          total_tests?: number
          passed_tests?: number
          failed_tests?: number
          skipped_tests?: number
          duration_seconds?: number
          commit_hash?: string | null
          branch_name?: string | null
          created_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          test_run_id: string
          test_name: string
          file_path: string | null
          status: string
          duration_ms: number
          error_message: string | null
          stack_trace: string | null
          created_at: string
        }
        Insert: {
          id?: string
          test_run_id: string
          test_name: string
          file_path?: string | null
          status: string
          duration_ms?: number
          error_message?: string | null
          stack_trace?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          test_run_id?: string
          test_name?: string
          file_path?: string | null
          status?: string
          duration_ms?: number
          error_message?: string | null
          stack_trace?: string | null
          created_at?: string
        }
      }
    }
  }
}
