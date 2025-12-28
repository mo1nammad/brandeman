import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Props = {
  viewMode: string;
  brand: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    brandStories: {
      version: number;
    }[];
  };
};
export default function BrandsCard({ viewMode, brand }: Props) {
  // grid view
  if (viewMode === "grid") {
    return (
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
          <Link
            href={`/dashboard/brands/${brand.id}`}
            className="cursor-pointer"
          >
            <ChevronLeft />
          </Link>
        </div>
      </Card>
    );
  }

  // list view
  else if (viewMode === "list") {
    return (
      <Card
        key={brand.id}
        className="flex flex-row items-center justify-between p-4 hover:shadow-md transition"
      >
        {/* Left / Main content */}
        <div className="flex flex-col gap-1">
          <h6 className="font-semibold">{brand.name}</h6>

          <p className="text-sm text-muted-foreground">
            {brand.brandStories.length > 0
              ? `${brand.brandStories.length} نسخه هویت برند`
              : "هنوز هویت برند ساخته نشده"}
          </p>

          <p className="text-xs text-muted-foreground">
            آخرین بروزرسانی: {formatDate(brand.updatedAt)}
          </p>
        </div>

        {/* Right / Action */}
        <Link
          href={`/dashboard/brands/${brand.id}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
        >
          <span className="text-sm">مشاهده</span>
          <ChevronLeft className="size-4" />
        </Link>
      </Card>
    );
  }

  // default view
  else return null;
}
