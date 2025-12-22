import Link from "next/link";
import { ArrowUpRightIcon, Folder } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function BrandsPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>برندی موجود نیست</EmptyTitle>
        <EmptyDescription>
          هنوز هیچ برندی به فهرست خود اضافه نکرده اید.می توانید با ساختن برند
          جدید از این سرویس استفاده نمایید
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <Link href="/generate">ایجاد برند</Link>
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          اطلاعات بیشتر <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}
