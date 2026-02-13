import Anthropic from '@anthropic-ai/sdk';

let client;

const PROMPT = `You are an expert ad creative analyst. Evaluate this advertisement image across 6 performance-predictive dimensions.

For each dimension, provide a score from 0-100 and a brief assessment (1-2 sentences):

1. **visual_hierarchy** — Is the viewer's eye guided to the most important element first? Is there a clear focal point?
2. **cta_clarity** — Is the call-to-action obvious, compelling, and easy to act on?
3. **text_legibility** — Can all text be read quickly at small sizes and on mobile screens?
4. **brand_consistency** — Does the ad feel like it belongs to a cohesive brand system?
5. **thumb_stop** — Would this stop a fast-scrolling user in a social feed? Is it visually arresting?
6. **information_density** — Is the amount of information appropriate — not too cluttered, not too sparse?

Also provide:
- **overall_score**: A weighted average (0-100) reflecting the ad's overall predicted performance.
- **summary**: A 1-2 sentence overall assessment.
- **top_improvement**: The single highest-impact change that would improve this ad's performance.

Respond ONLY with valid JSON in this exact shape:
{
  "visual_hierarchy": { "score": <number>, "assessment": "<string>" },
  "cta_clarity": { "score": <number>, "assessment": "<string>" },
  "text_legibility": { "score": <number>, "assessment": "<string>" },
  "brand_consistency": { "score": <number>, "assessment": "<string>" },
  "thumb_stop": { "score": <number>, "assessment": "<string>" },
  "information_density": { "score": <number>, "assessment": "<string>" },
  "overall_score": <number>,
  "summary": "<string>",
  "top_improvement": "<string>"
}`;

const VALID_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export async function evaluate(req, res) {
  try {
    if (!client) client = new Anthropic();
    const { image, mediaType } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "image" (base64 string)' });
    }
    if (!mediaType || !VALID_TYPES.includes(mediaType)) {
      return res.status(400).json({ error: `Invalid "mediaType". Must be one of: ${VALID_TYPES.join(', ')}` });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: image },
            },
            { type: 'text', text: PROMPT },
          ],
        },
      ],
    });

    const text = response.content[0].text;
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      return res.status(500).json({ error: 'Failed to parse evaluation' });
    }

    const parsed = JSON.parse(match[0]);
    res.json(parsed);
  } catch (err) {
    console.error('Evaluation error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to evaluate image' });
  }
}
