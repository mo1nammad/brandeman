import type { Brand, BrandQuestionnaire } from "@/generated/prisma/client";

export function buildBrandPrompt(brand: Brand, q: BrandQuestionnaire) {
  return `
You are a senior brand strategist.

Brand Info:
- Name: ${brand.name}
- Industry: ${brand.industry}
- Stage: ${brand.stage}
- Description: ${brand.description}

Audience:
- Type: ${q.audienceType}
- Ideal Customer: ${q.idealCustomer}
- Pain Points: ${q.painPoints}
- Value Proposition: ${q.valueProposition}

Brand DNA:
- Values: ${q.values.join(", ")}
- Personality: ${q.personality.join(", ")}
- Anti Values: ${q.antiValues ?? "None"}

Positioning:
- Competitors: ${q.competitors.join(", ")}
- Differentiation: ${q.differentiation}
- Desired Feelings: ${q.desiredFeeling.join(", ")}

Voice & Vision:
- Tone: ${q.tone}
- One-liner: ${q.oneLiner}
- Vision: ${q.vision}
- Goals: ${q.goals}

Output a complete Brand Identity including:
1. Brand Story
2. Brand Voice Guidelines
3. Core Messaging
4. Emotional Positioning

Write in Persian.
`;
}
