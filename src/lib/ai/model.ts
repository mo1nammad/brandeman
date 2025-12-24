import { createOpenAI } from "@ai-sdk/openai";

const token = process.env.GITHUB_OPENAI_API_KEY;
export const modelId = "openai/gpt-4.1";

export const model = createOpenAI({
  apiKey: token!,
  baseURL: "https://models.github.ai/inference",
});
