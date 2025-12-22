import React from "react";
import { FormStepper } from "@/components/features/generate/form-stepper";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-accent">
        <FormStepper className="mx-auto py-6 px-4 w-full gap-3 sm:w-fit sm:mt-0 sm:fixed sm:inset-y-0 sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:gap-4 xl:translate-y-0 xl:relative xl:inset-y-auto xl:py-8 xl:top-0 xl:w-fit xl:mx-auto xl:gap-12" />
      </div>
      <div className="sm:ml-60 xl:ml-0 mt-16">{children}</div>
    </section>
  );
}
