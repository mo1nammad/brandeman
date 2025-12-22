"use client";

import React from "react";
import { ChevronDown, ChevronRight, TestTubeDiagonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerateSteps } from "@/store/use-generate-steps";

const formSteps = [
  {
    id: 0,
    title: "Brand Fundamentals",
    description: "پایه‌های برند",
    icon: TestTubeDiagonal,
  },
  {
    id: 1,
    title: "Audience Intelligence",
    description: "مخاطب هدف",
    icon: TestTubeDiagonal,
  },
  {
    id: 2,
    title: "Brand DNA",
    description: "ارزش‌ها و DNA برند",
    icon: TestTubeDiagonal,
  },
  {
    id: 3,
    title: "Positioning",
    description: "موقعیت بازار و رقبا",
    icon: TestTubeDiagonal,
  },
  {
    id: 4,
    title: "Voice & Vision",
    description: "لحن، پیام و آینده برند",
    icon: TestTubeDiagonal,
  },
];

type FormStepperProps = {
  className?: string;
};

export const FormStepper = ({ className }: FormStepperProps) => {
  const { setStep: setActiveStep, step: activeStep } = useGenerateSteps();
  return (
    <div
      className={cn(
        "flex flex-col items-end xl:flex-row-reverse xl:justify-center xl:items-center",
        className
      )}
    >
      {formSteps.map((step, index) => (
        <React.Fragment key={step.id}>
          <FormStep
            onClick={() => setActiveStep(step.id)}
            isDone={activeStep >= step.id}
            step={step}
          />
          {/* seperators */}
          {formSteps.length - 1 !== index && (
            <>
              <ChevronRight className="size-5 hidden xl:block" />
              <ChevronDown className="size-5 hidden sm:block xl:hidden self-center" />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

type FormStepProps = {
  step: (typeof formSteps)[0];
  isDone: boolean;
  onClick: () => void;
};
export const FormStep = ({ isDone, step, onClick }: FormStepProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-4 cursor-pointer"
    >
      <div className="flex flex-col text-left">
        <h6 className="text-sm">{step.title}</h6>
        <p className="text-xs text-muted-foreground">{step.description}</p>
      </div>
      <div
        className={cn(
          "bg-muted rounded-full flex justify-center items-center size-8 sm:size-12",
          isDone && "bg-primary text-primary-foreground"
        )}
      >
        <step.icon className="size-4" />
      </div>
    </button>
  );
};
