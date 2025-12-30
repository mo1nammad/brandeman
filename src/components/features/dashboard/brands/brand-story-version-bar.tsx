import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
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
  onRegenerate?: () => void;
  content: string;
  storyId: string;
};
export default function BrandStoryVersionBar({
  versions,
  activeVersion,
  onChangeVersion,
  onRegenerate,
  content,
  storyId,
}: Props) {
  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur mb-2.5">
      <div className="max-w-7xl mx-auto py-3 flex flex-row-reverse items-center justify-between gap-4">
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
                نسخه {v.version}
                <span className="text-muted-foreground text-xs mr-2">
                  {new Date(v.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <VersionBarCopyShare
            content={content}
            shareUrl={`${BASE_URL}/shared/brandStory/${storyId}`}
          />

          <Button size="sm" disabled={!onRegenerate} onClick={onRegenerate}>
            <RefreshCcw className="w-4 h-4 ml-2" />
            تولید مجدد
          </Button>
        </div>
      </div>
    </div>
  );
}
