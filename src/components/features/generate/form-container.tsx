"use client";
import { Activity } from "react";

import { useGenerateSteps } from "@/store/use-generate-steps";

// forms
import FundamentalForm from "./fundamental-form";
import AudienceForm from "./audience-form";
import BrandDnaForm from "./brand-dna-form";
import PositioningForm from "./positioning-form";
import VoiceVisionForm from "./voice-vision-form";

export default function FormContainer() {
  const step = useGenerateSteps((s) => s.step);

  return (
    <>
      <Activity mode={step === 0 ? "visible" : "hidden"}>
        <FundamentalForm />
      </Activity>
      <Activity mode={step === 1 ? "visible" : "hidden"}>
        <AudienceForm />
      </Activity>
      <Activity mode={step === 2 ? "visible" : "hidden"}>
        <BrandDnaForm />
      </Activity>
      <Activity mode={step === 3 ? "visible" : "hidden"}>
        <PositioningForm />
      </Activity>
      <Activity mode={step === 4 ? "visible" : "hidden"}>
        <VoiceVisionForm />
      </Activity>
    </>
  );
}
