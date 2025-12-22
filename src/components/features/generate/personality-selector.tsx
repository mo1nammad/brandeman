"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface PersonalitySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

const OPTIONS = [
  "دوستانه",
  "حرفه‌ای",
  "جسور",
  "مینیمال",
  "لوکس",
  "مدرن",
  "خلاق",
  "قابل اعتماد",
  "الهام‌بخش",
  "جوان‌پسند",
];

export function PersonalitySelector({
  value,
  onChange,
  className,
}: PersonalitySelectorProps) {
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onValueChange={onChange}
      className={cn("flex flex-wrap justify-end gap-2", className)}
    >
      {OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option}
          value={option}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          )}
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
