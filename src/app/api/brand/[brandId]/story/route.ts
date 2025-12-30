import { NextRequest, NextResponse } from "next/server";

// controllers
import { getSession } from "@/actions/auth/session";
import { getBrandStory } from "@/actions/dashboard/brands/get-story";
import { getBrand } from "@/actions/dashboard/brands/get-brand";
import { BrandStoryApiResponse } from "@/types/brand";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/brand/[brandId]/story">
) {
  try {
    const auth = await getSession();
    const { brandId } = await ctx.params;
    const version = req.nextUrl.searchParams.get("version");

    if (!auth?.session.userId)
      return new NextResponse("unauthorized", { status: 401 });

    const userId = auth.session.userId;

    // check if brand exists
    const brandExists = await getBrand({
      brandId,
      userId,
    });

    if (!brandExists.data?.id)
      return new NextResponse("not found", {
        status: 404,
      });

    // get story by version
    const brandStory = await getBrandStory({
      brandId,
      version:
        version && typeof Number(version) === "number"
          ? Number(version)
          : brandExists.data.brandStories.length,
    });

    if (!brandStory.data?.id)
      return new NextResponse("not found", {
        status: 404,
      });

    const result: BrandStoryApiResponse = {
      storyCount: brandExists.data.brandStories.length,
      brandInfo: {
        name: brandExists.data.name,
        industry: brandExists.data.industry,
        versions: brandExists.data.brandStories.map((story) => ({
          version: story.version,
          createdAt: story.createdAt,
        })),
      },
      story: brandStory.data,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
