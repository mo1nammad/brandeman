"use client";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Settings } from "lucide-react";
import VersionBarCopyShare from "./version-bar-copy-share";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Version = {
  version: number;
  createdAt: Date;
};

type Props = {
  versions: Version[];
  activeVersion: number;
  onChangeVersion: (v: number) => void;
  content: string;
  storyId: string;
};

export default function BrandStoryVersionBar({
  versions,
  activeVersion,
  onChangeVersion,
  content,
  storyId,
}: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth;
    }
  }, []);

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur mb-2.5">
      <div
        ref={ref}
        className="max-w-7xl mx-auto py-3 overflow-x-auto"
        style={{ direction: "ltr" }}
      >
        {/* inner wrapper مهم */}
        <div className="flex items-center gap-4 w-max sm:w-full sm:justify-between">
          {/* Version Selector */}
          <Select
            value={String(activeVersion)}
            onValueChange={(v) => onChangeVersion(Number(v))}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="انتخاب نسخه" />
            </SelectTrigger>
            <SelectContent>
              {versions.map((v) => (
                <SelectItem key={v.version} value={String(v.version)}>
                  <span>نسخه {v.version}</span>
                  <span className="text-muted-foreground text-xs mr-2">
                    {new Date(v.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={{
                query: { regenerate: "true" },
              }}
            >
              <Button>
                <RefreshCcw className="w-4 h-4 ml-2" />
                تولید مجدد
              </Button>
            </Link>

            <VersionBarCopyShare
              content={content}
              shareUrl={`${BASE_URL}/shared/brandStory/${storyId}`}
            />
            <Link href={`${pathname}/settings`}>
              <Button variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
