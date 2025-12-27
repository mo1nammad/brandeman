import { getSession } from "@/actions/auth/session";
import Response from "@/actions/response";
import prisma from "@/lib/prisma";

export async function getBrands() {
  try {
    const auth = await getSession();

    if (!auth?.session.userId) return Response.refuse("Unauthorized");

    const userId = auth?.session.userId;

    const userBrands = await prisma.brand.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        brandStories: {
          select: {
            version: true,
          },
        },
      },
    });

    return Response.send(userBrands);
  } catch (error) {
    console.log(error);
    return Response.error(error as Error);
  }
}
