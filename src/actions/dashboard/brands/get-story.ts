import prisma from "@/lib/prisma";
import Response from "@/actions/response";

type GetBrandStoryParam = {
  brandId: string;
  version: number | undefined;
};

export async function getBrandStory({ brandId, version }: GetBrandStoryParam) {
  try {
    const brandStory = await prisma.brandStory.findFirst({
      where: {
        brandId: brandId,
        version,
      },
      orderBy: {
        version: "desc",
      },
    });

    return Response.send(brandStory);
  } catch (error) {
    return Response.error(error as Error);
  }
}
