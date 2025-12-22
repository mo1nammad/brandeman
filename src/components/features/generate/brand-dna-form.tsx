"use client";

import { useGenerateSteps } from "@/store/use-generate-steps";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { brandDnaSchema, BrandDnaFormValues } from "@/schemas/generate";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { TagInput } from "@/components/ui/tag-input";
import { PersonalitySelector } from "@/components/features/generate/personality-selector";

export default function BrandDnaForm() {
  const { step, setStep, setFormValues } = useGenerateSteps();

  const form = useForm<BrandDnaFormValues>({
    resolver: zodResolver(brandDnaSchema),
    defaultValues: {
      values: [],
      personality: [],
      antiValues: "",
    },
  });

  const onSubmit = (data: BrandDnaFormValues) => {
    setFormValues("brandDna", data);
    setStep(step + 1);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-xl font-bold">DNA برند شما</FieldLegend>

        <FieldDescription>
          این بخش شخصیت درونی برند شما را مشخص می‌کند و بیشترین تأثیر را روی
          خروجی نهایی دارد
        </FieldDescription>

        <FieldGroup>
          {/* Values */}
          <Controller
            control={form.control}
            name="values"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>ارزش‌های اصلی برند (۳ تا ۵ مورد)</FieldLabel>

                <TagInput
                  className="max-w-150"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="مثلاً اعتماد، سادگی، نوآوری"
                  max={5}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSeparator />
          {/* Personality */}
          <Controller
            control={form.control}
            name="personality"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>شخصیت برند شما چیست؟</FieldLabel>

                <PersonalitySelector
                  className="max-w-150"
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSeparator />

          {/* Anti Values */}
          <Controller
            control={form.control}
            name="antiValues"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>برند شما چه چیزهایی نیست؟</FieldLabel>

                <Textarea
                  {...field}
                  placeholder="مثلاً ارزان، شلوغ، غیرحرفه‌ای"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="submit" className="w-22">
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
