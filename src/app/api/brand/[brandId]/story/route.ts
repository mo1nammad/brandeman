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
      return new NextResponse("وارد حساب کاربری بشوید", { status: 401 });

    const userId = auth.session.userId;

    // check if brand exists

    const brandExists = await getBrand({
      brandId,
      userId,
    });

    if (!brandExists.data?.id)
      return new NextResponse("برند موردنظر وجود ندارد", {
        status: 404,
      });

    if (brandExists.data.brandStories.length === 0) {
      return new NextResponse(
        `/dashboard/brands/${brandExists.data.id}?regenerate=true`,
        {
          status: 307,
        }
      );
    }
    // get story by version
    const brandStory = await getBrandStory({
      brandId,
      version:
        version && typeof Number(version) === "number"
          ? Number(version)
          : brandExists.data.brandStories.length,
    });

    if (!brandStory.data?.id)
      return new NextResponse("هیچ هویتی برای برند موجود نیست", {
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
    return new NextResponse("خطای سرور", {
      status: 500,
    });
  }
}
