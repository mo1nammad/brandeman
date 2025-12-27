import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { getBrands } from "@/actions/dashboard/brands/get-brands";
import { formatDate } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import EmptyBrand from "./empty-brand";

export default async function UserBrands() {
  const brands = await getBrands();

  if (brands.error) return <div>مشکلی پیش آمد</div>;
  if (brands.data.length === 0) return <EmptyBrand />;

  return brands.data.map((brand) => (
    <Card
      key={brand.id}
      className="flex flex-col justify-between p-4 hover:shadow-md transition"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold">{brand.name}</h6>
        </div>

        <p className="text-sm text-muted-foreground">
          {brand.brandStories.length > 0
            ? `${brand.brandStories.length} نسخه هویت برند`
            : "هنوز هویت برند ساخته نشده"}
        </p>

        <p className="text-xs text-muted-foreground">
          آخرین بروزرسانی: {formatDate(brand.updatedAt)}
        </p>
      </div>

      <div className="mt-4 flex flex-row-reverse gap-2">
        <Link href={`/dashboard/brands/${brand.id}`} className="cursor-pointer">
          <ChevronLeft />
        </Link>
      </div>
    </Card>
  ));
}
