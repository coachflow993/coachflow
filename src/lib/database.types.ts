// Placeholder — regenerate from live DB via:
//   npx supabase gen types typescript --project-id csbobvgvzualthuzytcv > src/lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      audit_log: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      coaches: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      feedback: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }
      matches: {
        Row: {
          id: string
          athlete_id: string
          match_date: string
          opponent: string
          venue: string | null
          is_home: boolean
          our_score: number
          their_score: number
          my_position: string | null
          my_goals: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          athlete_id: string
          match_date: string
          opponent: string
          venue?: string | null
          is_home?: boolean
          our_score?: number
          their_score?: number
          my_position?: string | null
          my_goals?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          match_date?: string
          opponent?: string
          venue?: string | null
          is_home?: boolean
          our_score?: number
          their_score?: number
          my_position?: string | null
          my_goals?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
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
