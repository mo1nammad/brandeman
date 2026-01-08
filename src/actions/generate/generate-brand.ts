"use server";

import { getSession } from "@/actions/auth/session";
import prisma from "@/lib/prisma";
import Response from "@/actions/response";

import { finalFormSchema } from "@/schemas/generate";
import type { BrandFormValues } from "@/types/generate";

type GenerateBrandParams = {
  formValues: BrandFormValues;
};

export async function generateBrand(params: GenerateBrandParams) {
  const authData = await getSession();

  if (!authData?.session.userId)
    return Response.refuse("لطفا وارد حساب کاربری خود بشوید");

  const userId = authData.session.userId;

  const formValidated = finalFormSchema.safeParse(params.formValues);

  if (!formValidated.success)
    return Response.refuse("فرم به درستی ارسال نشده است");

  const brand = await prisma.brand.create({
    data: {
      userId,
      name: formValidated.data.fundamental.brandName,
      industry: formValidated.data.fundamental.industry,
      stage: formValidated.data.fundamental.stage,
      description: formValidated.data.fundamental.description,
      brandQuestionnaire: {
        create: {
          // Audience
          audienceType: formValidated.data.audience.audienceType,
          idealCustomer: formValidated.data.audience.idealCustomer,
          painPoints: formValidated.data.audience.painPoints,
          valueProposition: formValidated.data.audience.valueProposition,

          // dna
          values: formValidated.data.brandDna.values,
          personality: formValidated.data.brandDna.personality,
          antiValues: formValidated.data.brandDna.antiValues,

          // Positioning
          competitors: formValidated.data.positioning.competitors,
          differentiation: formValidated.data.positioning.differentiation,
          desiredFeeling: formValidated.data.positioning.desiredFeeling,

          // Voice & Vision
          tone: formValidated.data.voiceVision.toneOfVoice,
          oneLiner: formValidated.data.voiceVision.oneLiner,
          vision: formValidated.data.voiceVision.vision,
          goals: formValidated.data.voiceVision.brandGoal,
        },
      },
    },
  });

  return Response.send({
    brandId: brand.id,
  });
}
