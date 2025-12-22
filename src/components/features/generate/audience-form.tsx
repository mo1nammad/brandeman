"use client";

import { useGenerateSteps } from "@/store/use-generate-steps";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { audienceSchema, AudienceFormValues } from "@/schemas/generate";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AudienceForm() {
  const { step, setStep, setFormValues } = useGenerateSteps();

  const form = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceSchema),
    defaultValues: {
      audienceType: "B2C",
      idealCustomer: "",
      painPoints: "",
      valueProposition: "",
    },
  });

  const onSubmit = (data: AudienceFormValues) => {
    setFormValues("audience", data);
    setStep(step + 1);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-xl font-bold">شناخت مخاطب هدف</FieldLegend>

        <FieldDescription>
          این اطلاعات به ما کمک می‌کند پیام برند را دقیق‌تر بسازیم
        </FieldDescription>

        <FieldGroup>
          {/* Audience Type */}
          <Controller
            control={form.control}
            name="audienceType"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>مخاطب اصلی شما چه کسانی هستند؟</FieldLabel>

                <RadioGroup
                  dir="rtl"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col gap-2"
                >
                  <Label className="flex items-center gap-2">
                    <RadioGroupItem value="B2C" />
                    مصرف‌کننده نهایی (B2C)
                  </Label>

                  <Label className="flex items-center gap-2">
                    <RadioGroupItem value="B2B" />
                    کسب‌وکارها (B2B)
                  </Label>

                  <Label className="flex items-center gap-2">
                    <RadioGroupItem value="BOTH" />
                    هر دو
                  </Label>
                </RadioGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Ideal Customer */}
          <Controller
            control={form.control}
            name="idealCustomer"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>مخاطب ایده‌آل خود را توصیف کنید</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="سن، شغل، دغدغه‌ها، سبک زندگی..."
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Pain Points */}
          <Controller
            control={form.control}
            name="painPoints"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>بزرگ‌ترین مشکل یا نیاز مخاطب چیست؟</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="چه چیزی بیشترین درد مخاطب است؟"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Value Proposition */}
          <Controller
            control={form.control}
            name="valueProposition"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>چرا مخاطب باید شما را انتخاب کند؟</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="مزیت اصلی شما از نگاه مخاطب"
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
