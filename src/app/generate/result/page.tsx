import { redirect } from "next/navigation";

import ResultStreamUi from "@/components/features/generate/result-stream-ui";

export default async function GenerateResultPage({
  searchParams,
}: {
  searchParams: Promise<{ brandId: string | string[] | undefined }>;
}) {
  const { brandId } = await searchParams;
  if (!brandId || typeof brandId !== "string") {
    redirect("/dashboard");
  }

  return <ResultStreamUi brandId={brandId} />;
}
