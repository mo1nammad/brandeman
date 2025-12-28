import { BrandStory } from "@/generated/prisma/client";

export type BrandStoryApiResponse = {
  storyCount: number;
  story: BrandStory;
};
