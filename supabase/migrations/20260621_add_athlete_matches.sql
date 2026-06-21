-- Sprint 1: Reshape matches table for athlete-centric match logging
-- Adds athlete_id, match_date, is_home, my_position, my_goals
-- Removes team_id, played_at, home_away, scorers, assists, ai_report, video_url

BEGIN;

-- Drop existing RLS policies that depend on team_id
DROP POLICY IF EXISTS "matches_coach_access" ON public.matches;
DROP POLICY IF EXISTS "matches_parent_read" ON public.matches;
DROP POLICY IF EXISTS "moments_coach_access" ON public.moments;

-- Add new columns
ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS athlete_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS match_date date,
  ADD COLUMN IF NOT EXISTS is_home boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS my_position text,
  ADD COLUMN IF NOT EXISTS my_goals integer DEFAULT 0;

-- Rename existing columns to match spec
ALTER TABLE public.matches RENAME COLUMN score_us TO our_score;
ALTER TABLE public.matches RENAME COLUMN score_them TO their_score;

-- Set defaults for score columns
ALTER TABLE public.matches ALTER COLUMN our_score SET DEFAULT 0;
ALTER TABLE public.matches ALTER COLUMN their_score SET DEFAULT 0;

-- Drop columns not needed for Sprint 1 (CASCADE to drop dependent objects)
ALTER TABLE public.matches
  DROP COLUMN IF EXISTS team_id CASCADE,
  DROP COLUMN IF EXISTS played_at,
  DROP COLUMN IF EXISTS home_away,
  DROP COLUMN IF EXISTS scorers,
  DROP COLUMN IF EXISTS assists,
  DROP COLUMN IF EXISTS ai_report,
  DROP COLUMN IF EXISTS video_url;

-- Make athlete_id and match_date NOT NULL (table is empty so safe)
ALTER TABLE public.matches ALTER COLUMN athlete_id SET NOT NULL;
ALTER TABLE public.matches ALTER COLUMN match_date SET NOT NULL;
ALTER TABLE public.matches ALTER COLUMN opponent SET NOT NULL;

-- Index for list query performance
CREATE INDEX IF NOT EXISTS idx_matches_athlete_date
  ON public.matches (athlete_id, match_date DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS matches_updated_at ON public.matches;
CREATE TRIGGER matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- RLS policies: athlete can only access own matches
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Athletes can view own matches" ON public.matches;
CREATE POLICY "Athletes can view own matches"
  ON public.matches FOR SELECT
  USING (athlete_id = auth.uid());

DROP POLICY IF EXISTS "Athletes can insert own matches" ON public.matches;
CREATE POLICY "Athletes can insert own matches"
  ON public.matches FOR INSERT
  WITH CHECK (athlete_id = auth.uid());

DROP POLICY IF EXISTS "Athletes can update own matches" ON public.matches;
CREATE POLICY "Athletes can update own matches"
  ON public.matches FOR UPDATE
  USING (athlete_id = auth.uid())
  WITH CHECK (athlete_id = auth.uid());

DROP POLICY IF EXISTS "Athletes can delete own matches" ON public.matches;
CREATE POLICY "Athletes can delete own matches"
  ON public.matches FOR DELETE
  USING (athlete_id = auth.uid());

COMMIT;
