//types
import { BrandStoryApiResponse } from "@/types/brand";

export const api = {
  brand: {
    story: {
      get: async (brandId: string): Promise<BrandStoryApiResponse> => {
        const response = await fetch(`/api/brand/${brandId}/story`);
        return await response.json();
      },
    },
  },
};
