"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BRAND_SETTINGS_TABS = [
  { value: "general", label: "عمومی" },
  { value: "prompt", label: "پرامپت و هوش مصنوعی" },
  { value: "danger", label: "عملیات حیاتی" },
] as const;

type Props = {
  children: React.ReactNode;
};

export default function BrandSettingTab({ children }: Props) {
  const [tab, setTab] = useState<string>(BRAND_SETTINGS_TABS[0].value);

  return (
    <Tabs dir="rtl" value={tab} onValueChange={setTab}>
      {/* Mobile */}
      <div className="md:hidden mb-6">
        <Select value={tab} onValueChange={setTab}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BRAND_SETTINGS_TABS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop */}
      <TabsList className="hidden md:block mb-6">
        {BRAND_SETTINGS_TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* tab contents */}
      {children}
    </Tabs>
  );
}
