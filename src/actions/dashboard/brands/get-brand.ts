import prisma from "@/lib/prisma";
import Response from "@/actions/response";

type GetBrandParam = {
  brandId: string;
  userId: string;
};

export async function getBrand({ brandId, userId }: GetBrandParam) {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
        userId,
      },
      include: {
        brandStories: true,
        brandQuestionnaire: true,
      },
    });

    return Response.send(brand);
  } catch (error) {
    return Response.error(error as Error);
  }
}
