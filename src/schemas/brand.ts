import * as z from "zod";

export const getBrandStorySchema = z.object({
  version: z.number().min(1).max(100).nullable(),
});
export type GetBrandStorySchemaType = z.infer<typeof getBrandStorySchema>;
