import * as z from "zod";

export const getBrandStorySchema = z
  .object({
    version: z.number().min(1).max(100),
  })
  .nullable();
export type GetBrandStorySchemaType = z.infer<typeof getBrandStorySchema>;

import { aiModels, BRAND_STAGES } from "@/lib/constant";

export const brandGeneralSchema = z.object({
  name: z.string().min(2, "نام برند الزامی است"),
  industry: z.string().min(2, "حوزه فعالیت الزامی است"),
  stage: z.enum(BRAND_STAGES),
  description: z.string().optional(),
});

export type BrandGeneralFormValues = z.infer<typeof brandGeneralSchema>;

/**
 * Prompt customization settings
 * Stored in BrandQuestionnaire.extra.prompt
 */
export const brandPromptSchema = z.object({
  aiModel: z.string().min(1).max(128),
  systemInstruction: z
    .string()
    .min(10, "حداقل ۱۰ کاراکتر وارد کنید")
    .max(1000, "حداکثر ۱۰۰۰ کاراکتر مجاز است")
    .optional(),

  creativity: z.enum(["LOW", "MEDIUM", "HIGH"]),

  outputLength: z.enum(["SHORT", "MEDIUM", "LONG"]),

  // future-proof
  languageHint: z.string().max(200).optional(),
});

export type BrandPromptFormValues = z.infer<typeof brandPromptSchema>;
