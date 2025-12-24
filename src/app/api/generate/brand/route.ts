import { type NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";

import prisma from "@/lib/prisma";
import { getSession } from "@/actions/auth/session";
import { model, modelId } from "@/lib/ai/model";
import { buildBrandPrompt } from "@/lib/ai/build-brand-prompt";

export async function POST(request: NextRequest) {
  const authData = await getSession();

  if (!authData?.session.userId)
    return new NextResponse("Unauthorized", {
      status: 401,
    });

  const { brandId } = await request.json();

  if (!brandId)
    return new NextResponse("forbidden", {
      status: 403,
    });

  const userId = authData?.session.userId;

  const brand = await prisma.brand.findUnique({
    where: {
      id: brandId,
      userId: userId,
    },
    include: { brandQuestionnaire: true },
  });

  if (!brand || !brand.brandQuestionnaire)
    return new NextResponse("Brand not found", {
      status: 404,
    });

  const prompt = buildBrandPrompt(brand, brand.brandQuestionnaire);

  const result = streamText({
    model: model.chat(modelId),
    prompt,
    onFinish: async ({ text }) => {
      const version =
        (await prisma.brandStory.count({
          where: {
            brandId: brand.id,
          },
        })) + 1;

      await prisma.brandStory.create({
        data: {
          brandId: brand.id,
          version,
          prompt: { text: prompt },
          output: { text },
          model: modelId,
        },
      });
    },
  });

  return result.toTextStreamResponse({
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
