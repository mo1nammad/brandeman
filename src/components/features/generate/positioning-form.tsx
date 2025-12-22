"use client";

import { useGenerateSteps } from "@/store/use-generate-steps";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { positioningSchema, PositioningFormValues } from "@/schemas/generate";

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
import { Textarea } from "@/components/ui/textarea";

import { TagInput } from "@/components/ui/tag-input";
import { FeelingSelector } from "@/components/features/generate/feeling-selector";

export default function PositioningForm() {
  const { step, setStep, setFormValues } = useGenerateSteps();

  const form = useForm<PositioningFormValues>({
    resolver: zodResolver(positioningSchema),
    defaultValues: {
      competitors: [],
      differentiation: "",
      desiredFeeling: [],
    },
  });

  const onSubmit = (data: PositioningFormValues) => {
    setFormValues("positioning", data);
    setStep(step + 1);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-xl font-bold">
          جایگاه برند در بازار
        </FieldLegend>

        <FieldDescription>
          این اطلاعات مشخص می‌کند برند شما چگونه از رقبا متمایز می‌شود و چه
          احساسی ایجاد می‌کند
        </FieldDescription>

        <FieldGroup>
          {/* Competitors */}
          <Controller
            control={form.control}
            name="competitors"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>رقبای اصلی شما چه برندهایی هستند؟</FieldLabel>

                <TagInput
                  className="max-w-150"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="مثلاً دیجی‌کالا، ترب، اسنپ"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Differentiation */}
          <Controller
            control={form.control}
            name="differentiation"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>چه چیزی شما را از رقبا متمایز می‌کند؟</FieldLabel>

                <Textarea
                  {...field}
                  placeholder="مزیت رقابتی واقعی شما چیست؟"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Desired Feeling */}
          <Controller
            control={form.control}
            name="desiredFeeling"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>دوست دارید مخاطب چه احساسی داشته باشد؟</FieldLabel>

                <FeelingSelector
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button className="w-22" type="submit">
              بعدی
            </Button>
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
