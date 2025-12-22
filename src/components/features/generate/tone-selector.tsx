"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const TONES = ["دوستانه", "حرفه‌ای", "جسور", "الهام‌بخش", "مدرن"];

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onChange}
      className="flex gap-2 max-w-150 justify-end"
    >
      {TONES.map((tone) => (
        <ToggleGroupItem
          key={tone}
          value={tone}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          )}
        >
          {tone}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
