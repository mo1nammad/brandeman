"use client";

import { KeyboardEvent } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  max?: number;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder,
  max = 5,
  className,
}: TagInputProps) {
  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || value.includes(clean) || value.length >= max) return;

    onChange([...value, clean]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const inputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }

    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn("flex flex-wrap gap-2 border rounded-md p-2", className)}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
        >
          {tag}
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => removeTag(tag)}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}

      <Input
        className="border-none flex-1"
        disabled={value.length >= max}
        placeholder={
          value.length >= max ? "حداکثر تعداد تکمیل شد" : placeholder
        }
        onKeyDown={inputOnKeyDown}
      />
    </div>
  );
}
