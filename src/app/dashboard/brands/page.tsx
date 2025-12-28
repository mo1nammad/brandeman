import { Suspense } from "react";

import UserBrands from "@/components/features/dashboard/brands/user-brands";
import LoadingBrands from "@/components/features/dashboard/brands/loading-brands";
import BrandsPageHeader from "@/components/features/dashboard/brands/brands-page-header";
import { cn } from "@/lib/utils";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function BrandsPage({ searchParams }: Props) {
  const params = await searchParams;
  const searchFilter = params.search as string | undefined;
  const viewMode = params.view as string | undefined;
  return (
    <>
      <Suspense>
        <BrandsPageHeader />
      </Suspense>
      <div className="relative min-h-150">
        <div
          className={cn(
            "gap-12 md:grid-cols-2 2xl:grid-cols-3 grid-rows-3",
            viewMode === "grid" ? "grid" : "flex flex-col"
          )}
        >
          <Suspense fallback={<LoadingBrands />}>
            <UserBrands searchFilter={searchFilter} viewMode={viewMode} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
