import { supabase } from './supabase'

export type Match = {
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

export type MatchInsert = Omit<Match, 'id' | 'created_at' | 'updated_at'>

export async function fetchMatches() {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: false })
  if (error) throw error
  return data as Match[]
}

export async function fetchMatchById(id: string) {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Match
}

export async function createMatch(match: MatchInsert) {
  const { data, error } = await supabase
    .from('matches')
    .insert(match)
    .select()
    .single()
  if (error) throw error
  return data as Match
}

export async function updateMatch(id: string, updates: Partial<MatchInsert>) {
  const { data, error } = await supabase
    .from('matches')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Match
}

export async function deleteMatch(id: string) {
  const { error } = await supabase
    .from('matches')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function fetchMatchStats() {
  const { data, error } = await supabase
    .from('matches')
    .select('my_goals')
  if (error) throw error
  const matches = data ?? []
  return {
    count: matches.length,
    totalGoals: matches.reduce((sum, m) => sum + (m.my_goals ?? 0), 0),
  }
}
