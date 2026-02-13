# AdEval

Most teams evaluate ad creative with vibes. "Looks good" gets greenlit while "feels off" gets sent back for another round. There's no shared vocabulary, no consistent criteria, and no way to compare one ad to another.

AdEval replaces gut checks with structured analysis. Upload an ad creative and get scored across 6 performance-predictive dimensions — visual hierarchy, CTA clarity, text legibility, brand consistency, thumb-stop power, and information density — powered by Claude's vision API.

Each dimension returns a 0–100 score with a targeted assessment. You also get an overall grade, a summary, and the single highest-impact improvement to prioritize next.

## How it works

1. **Upload** — Drop a PNG, JPG, or WEBP of any ad creative
2. **Evaluate** — Claude's vision model analyzes the image across 6 dimensions
3. **Review** — Scores, assessments, and a prioritized improvement render instantly

## Dimensions

| Dimension | What it measures |
|-----------|-----------------|
| **Visual Hierarchy** | Is the viewer's eye guided to the most important element first? |
| **CTA Clarity** | Is the call-to-action obvious, compelling, and easy to act on? |
| **Text Legibility** | Can all text be read quickly at small sizes and on mobile? |
| **Brand Consistency** | Does the ad feel like it belongs to a cohesive brand system? |
| **Thumb Stop** | Would this stop a fast-scrolling user in a social feed? |
| **Information Density** | Is the amount of information appropriate — not cluttered, not sparse? |

## Setup

```bash
# Clone and install
git clone <repo-url> && cd adeval
cp .env.example .env        # Add your Anthropic API key

cd server && npm install
cd ../client && npm install
```

## Run

```bash
# Terminal 1 — API server
cd server && npm start       # localhost:3001

# Terminal 2 — Dev server
cd client && npm run dev     # localhost:5173
```

Open [localhost:5173](http://localhost:5173), upload an ad, and click **Run Eval**.

## Stack

- **Frontend** — React + Vite
- **Backend** — Express
- **AI** — Claude claude-sonnet-4-20250514 (vision)
- **Styling** — Custom CSS with Sora + JetBrains Mono

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |
| `PORT` | No | Server port (default: 3001) |

## License

MIT
