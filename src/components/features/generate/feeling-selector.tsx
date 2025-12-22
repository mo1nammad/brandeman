"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const FEELINGS = [
  "اعتماد",
  "هیجان",
  "آرامش",
  "امنیت",
  "الهام",
  "انگیزه",
  "کنترل",
  "لذت",
];

interface FeelingSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function FeelingSelector({ value, onChange }: FeelingSelectorProps) {
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onValueChange={onChange}
      className="flex flex-wrap justify-end gap-2"
    >
      {FEELINGS.map((feeling) => (
        <ToggleGroupItem
          key={feeling}
          value={feeling}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          )}
        >
          {feeling}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
