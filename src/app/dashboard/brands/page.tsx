import { Suspense } from "react";
import UserBrands from "@/components/features/dashboard/brands/user-brands";
import LoadingBrands from "@/components/features/dashboard/brands/loading-brands";

export default function BrandsPage() {
  return (
    <div className="w-full grid gap-12 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 grid-rows-3">
      <Suspense fallback={<LoadingBrands />}>
        <UserBrands />
      </Suspense>
    </div>
  );
}
