import { generateText } from "ai";
import { model } from "@/lib/ai/model";

export async function GET() {
  try {
    const result = await generateText({
      model: model.chat("openai/gpt-4.1"),
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
