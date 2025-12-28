import { NextRequest, NextResponse } from "next/server";

// controllers
import { getSession } from "@/actions/auth/session";
import { getBrandStory } from "@/actions/dashboard/brands/get-story";
import { getBrand } from "@/actions/dashboard/brands/get-brand";

// types
import { getBrandStorySchema } from "@/schemas/brand";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/brand/[brandId]/story">
) {
  try {
    const auth = await getSession();
    const validatedBody = getBrandStorySchema.safeParse(req.body);
    const { brandId } = await ctx.params;

    if (!validatedBody.success)
      return new NextResponse("forbidden", {
        status: 403,
      });

    if (!auth?.session.userId)
      return new NextResponse("Unauthorized", { status: 401 });

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
        validatedBody.data.version ?? brandExists.data._count.brandStories,
    });

    if (!brandStory.data?.id)
      return new NextResponse("not found", {
        status: 404,
      });

    return NextResponse.json({
      storyCount: brandExists.data._count,
      story: brandStory.data,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
