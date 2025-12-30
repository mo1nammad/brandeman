import { BrandStory } from "@/generated/prisma/client";

export type BrandStoryApiResponse = {
  data: {
    storyCount: number;
    brandInfo: {
      name: string;
      industry: string;
      versions: {
        version: number;
        createdAt: Date;
      }[];
    };
    story: BrandStory;
  } | null;

  redirectTo: string | null;
};
