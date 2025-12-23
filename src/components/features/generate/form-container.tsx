"use client";

import { Activity, useState, useTransition } from "react";

import { useGenerateSteps } from "@/store/use-generate-steps";
import type { BrandFormValues } from "@/types/generate";

// action
import { generateBrand } from "@/actions/generate/generate-brand";

// forms
import FundamentalForm from "./fundamental-form";
import AudienceForm from "./audience-form";
import BrandDnaForm from "./brand-dna-form";
import PositioningForm from "./positioning-form";
import VoiceVisionForm from "./voice-vision-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

export default function FormContainer() {
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const step = useGenerateSteps((s) => s.step);
  const formValues = useGenerateSteps((s) => s.formValues);

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
        <VoiceVisionForm onSubmitForm={() => setOpenModal(true)} />
      </Activity>

      {/* confirm form modal */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              آیا از ثبت نهایی فرم ها اطمینان دارید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              در صورت تایید برند شما ایجاد خواهد شد
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  const response = await generateBrand({
                    formValues: formValues as BrandFormValues,
                  });
                  if (response.data) {
                    // console.log(response.data.brandId);
                  }
                });
              }}
            >
              ثبت نهایی
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
