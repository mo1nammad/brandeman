"use client";

import { useGenerateSteps } from "@/store/use-generate-steps";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { voiceVisionSchema, VoiceVisionFormValues } from "@/schemas/generate";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ToneSelector } from "@/components/features/generate/tone-selector";

type Props = {
  onSubmitForm?: () => void;
};

export default function VoiceVisionForm({ onSubmitForm }: Props) {
  const { step, setStep, setFormValues } = useGenerateSteps();

  const form = useForm<VoiceVisionFormValues>({
    resolver: zodResolver(voiceVisionSchema),
    defaultValues: {
      toneOfVoice: "",
      oneLiner: "",
      vision: "",
      brandGoal: "",
    },
  });

  const onSubmit = (data: VoiceVisionFormValues) => {
    setFormValues("voiceVision", data);
    onSubmitForm?.();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-xl font-bold">
          صدای برند و چشم‌انداز
        </FieldLegend>
        <FieldDescription>
          مشخص کنید برند شما چه لحن و جهت‌گیری‌ای دارد.
        </FieldDescription>

        <FieldGroup>
          {/* Tone of Voice */}
          <Controller
            control={form.control}
            name="toneOfVoice"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>لحن برند شما چیست؟</FieldLabel>
                <ToneSelector value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* One-liner */}
          <Controller
            control={form.control}
            name="oneLiner"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>جمله کوتاه معرفی برند</FieldLabel>
                <Input
                  {...field}
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                  placeholder="مثلاً برندی که زندگی را ساده‌تر می‌کند"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Vision */}
          <Controller
            control={form.control}
            name="vision"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>چشم‌انداز برند</FieldLabel>
                <Textarea
                  {...field}
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                  placeholder="آرمان بلندمدت برند خود را توضیح دهید"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Brand Goal */}
          <Controller
            control={form.control}
            name="brandGoal"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>هدف اصلی برند</FieldLabel>
                <Textarea
                  className="max-w-150"
                  placeholder="هدف نهایی برند چیست؟"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="submit">ثبت نهایی</Button>

            <Button
              className="w-22"
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              قبلی
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
