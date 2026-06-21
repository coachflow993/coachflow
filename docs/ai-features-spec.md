# AI Features Roadmap & Cost Considerations

## Overview

All AI features run server-side via Netlify Functions calling Anthropic API (Claude). Never expose API keys client-side.

## Sprint 4: AI Chatbot

- Context-aware (athletes, matches, weaknesses injected as system prompt)
- Streaming responses
- Per-coach chat history saved
- Floating chat button UI

## Sprint 4: Plan Generation + Regenerate

- Coach asks for training plan, AI generates
- Regenerate variants:
  - Shorter
  - Less intense
  - Focus on X (specific weakness)
  - Different style
  - For younger players
  - Team-wide
- Thumbs up/down feedback loop for personalization

## Sprint 5: YouTube Content Discovery

- YouTube Data API v3 integration
- AI generates optimal search query from weakness description
- Whitelist of trusted channels (initial seed list to maintain)
- Coach can pin videos to athlete's training plan

## Sprint 5: Coaching Philosophy Filter

- Sasha selects style (possession/counter, FA-aligned, age-group)
- AI responses filtered through that lens

## Sprint 9: AI-Drawn Video Annotations

- Vision API (Claude Vision or GPT-4V) analyzes keyframes
- Returns: timestamp, observation, suggested annotation
- Renders as overlay on video
- Coach approves/edits before sharing with athlete

## Sprint 11: POV Scanning Analysis

- AI analyzes first-person athlete footage
- Tracks head-turn frequency (scanning behavior)
- Compares to position-average benchmarks

## Future

- Voice-to-match-record
- Auto-translation
- Injury risk prediction

## Cost Considerations

- Each chatbot call: ~$0.01–0.05
- Each video annotation: ~$0.30–1.00
- Plan free tier: limited AI calls per week
- Plan paid tier: unlimited AI calls

## Privacy

- Never send minor athlete personal data to AI in identifiable form
- Use anonymized IDs in prompts
- Log all AI interactions for audit
