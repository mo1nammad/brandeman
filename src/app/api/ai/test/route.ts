import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const token = process.env.GITHUB_OPENAI_API_KEY;

const githubAI = createOpenAI({
  apiKey: token!,
  baseURL: "https://models.github.ai/inference",
});

export async function GET(request: Request) {
  try {
    const result = await generateText({
      model: githubAI.chat("openai/gpt-4.1"),
      prompt: "Say hello and confirm the GitHub AI is working.",
    });

    return Response.json({
      error: null,
      data: {
        message: result.text,
      },
    });
  } catch (error) {
    console.log("AI API ERROR", error);

    if (error instanceof Error) {
      return Response.json(
        {
          error,
          data: null,
        },
        {
          status: 500,
        }
      );
    }
  }
}
