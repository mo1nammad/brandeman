import prisma from "@/lib/prisma";

import BrandStoryClient from "@/components/features/dashboard/brands/brand-story-client";

type Props = {
  params: Promise<{ brandId: string }>;
};
export default async function BrandStoryPage({ params }: Props) {
  const { brandId } = await params;

  const latestVersion = await prisma.brandStory.findFirst({
    where: { brandId },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  return <BrandStoryClient latestVersion={latestVersion?.version ?? 1} />;
}
