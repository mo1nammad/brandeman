import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrandsPage() {
  return (
    <div className="flex">
      <Button>
        <Link href={"/generate"}>ساخت برند جدید</Link>
      </Button>
    </div>
  );
}
