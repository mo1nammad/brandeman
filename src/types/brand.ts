import { BrandStory } from "@/generated/prisma/client";

export type BrandStoryApiResponse = {
  storyCount: number;
  info: {
    name: string;
    industry: string;
  };
  story: BrandStory;
};
