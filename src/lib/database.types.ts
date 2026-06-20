// Placeholder — regenerate from live DB via:
//   npx supabase gen types typescript --project-id csbobvgvzualthuzytcv > src/lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      audit_log: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      coaches: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      feedback: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      matches: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      moments: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      parents: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      players: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      sessions: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      skill_ratings: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      tasks: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      teams: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
