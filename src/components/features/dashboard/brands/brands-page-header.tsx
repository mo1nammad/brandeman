"use client";

import { startTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

export default function BrandsPageHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFilter = searchParams.get("search") || "";
  const layoutType = searchParams.get("view") || "grid";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-row items-center my-4 gap-x-2">
      <Link href="/generate">
        <Button>ایجاد برند</Button>
      </Link>

      <ButtonGroup dir="ltr" className="border rounded-lg">
        <Button
          onClick={() =>
            startTransition(() =>
              router.replace(pathname + "?" + createQueryString("view", "grid"))
            )
          }
          size="icon"
          variant="ghost"
          className={cn(layoutType !== "grid" && "bg-accent")}
        >
          <LayoutGrid />
        </Button>

        <Button
          onClick={() =>
            router.replace(pathname + "?" + createQueryString("view", "list"))
          }
          size="icon"
          variant="ghost"
          className={cn(layoutType !== "list" && "bg-accent")}
        >
          <List />
        </Button>
      </ButtonGroup>

      <div className="relative w-full">
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          defaultValue={searchFilter}
          onChange={(ev) => {
            const queryString = createQueryString("search", ev.target.value);
            router.replace(`${pathname}?${queryString}`);
          }}
          placeholder="جستجوی برند"
          className="pr-7 w-full"
        />
      </div>
    </div>
  );
}
