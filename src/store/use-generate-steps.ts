import { create } from "zustand";

import type {
  AudienceFormValues,
  BrandDnaFormValues,
  FundamentalFormValues,
  PositioningFormValues,
  VoiceVisionFormValues,
} from "@/schemas/generate";

interface GenerateSteps {
  step: number;
  formValues: {
    audience: AudienceFormValues | undefined;
    brandDna: BrandDnaFormValues | undefined;
    fundamental: FundamentalFormValues | undefined;
    positioning: PositioningFormValues | undefined;
    voiceVision: VoiceVisionFormValues | undefined;
  };
  setStep: (step: number) => void;
  setFormValues: (
    key: keyof GenerateSteps["formValues"],
    value: GenerateSteps["formValues"][keyof GenerateSteps["formValues"]]
  ) => void;
}

export const useGenerateSteps = create<GenerateSteps>((set) => ({
  step: 0,
  formValues: {
    audience: undefined,
    brandDna: undefined,
    fundamental: undefined,
    positioning: undefined,
    voiceVision: undefined,
  },
  setStep: (step) =>
    set({
      step,
    }),

  setFormValues: (key, value) => {
    set((state) => ({
      formValues: {
        ...state.formValues,
        [key]: value,
      },
    }));
  },
}));
