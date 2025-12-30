import { Suspense } from "react";
import prisma from "@/lib/prisma";

import BrandStoryClient from "@/components/features/dashboard/brands/brand-story-client";
import ResultStreamUi from "@/components/features/generate/result-stream-ui";

type Props = {
  params: Promise<{ brandId: string }>;
  searchParams: Promise<{ regenerate: string }>;
};
export default async function BrandStoryPage({ params, searchParams }: Props) {
  const { brandId } = await params;
  const { regenerate } = await searchParams;

  const brandStory = await prisma.brandStory.findFirst({
    where: { brandId },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  return (
    <Suspense>
      {/* generate new ai response */}
      {regenerate === "true" ? (
        <ResultStreamUi
          brandId={brandId}
          redirect={{
            type: "replace",
            url: `/dashboard/brands/${brandId}?revalidate=true`,
          }}
        />
      ) : (
        <BrandStoryClient latestVersion={brandStory?.version ?? 1} />
      )}
    </Suspense>
  );
}
