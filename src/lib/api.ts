//types
import { BrandStoryApiResponse } from "@/types/brand";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  brand: {
    story: {
      get: async (
        brandId: string,
        init?: RequestInit
      ): Promise<BrandStoryApiResponse | null> => {
        const response = await fetch(
          `${BASE_URL}/brand/${brandId}/story`,
          init
        );
        if (response.ok) {
          return await response.json();
        }

        return null;
      },
    },
  },
};
