"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { brandPromptSchema, BrandPromptFormValues } from "@/schemas/brand";
import { Label } from "@/components/ui/label";

type Props = {
  defaultValues: BrandPromptFormValues;
};

export default function BrandPromptSettingsForm({ defaultValues }: Props) {
  const form = useForm<BrandPromptFormValues>({
    resolver: zodResolver(brandPromptSchema),
    defaultValues: defaultValues,
  });

  const submitForm = (val: BrandPromptFormValues) => {
    console.log(val);
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <FieldSet className="max-w-3xl">
        <FieldLegend className="text-xl font-bold">
          تنظیمات هوش مصنوعی و پرامپت
        </FieldLegend>

        <FieldDescription>
          این تنظیمات تعیین می‌کند هوش مصنوعی چگونه درباره برند شما فکر و تولید
          محتوا کند
        </FieldDescription>

        <Controller
          control={form.control}
          name="aiModel"
          render={({ field }) => (
            <Field>
              <FieldLabel>انتخاب مدل هوش مصنوعی</FieldLabel>
              <Select dir="rtl" {...field}>
                <SelectTrigger className="max-w-122">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-w-122">
                  <SelectItem value="openai/gpt-4.1">Gpt-4.1</SelectItem>
                  <SelectItem disabled value="openai/gpt-4.0 mini">
                    Gpt-4.0 mini
                  </SelectItem>
                  <SelectItem disabled value="openai/gpt-5.0 mini">
                    Gpt-5.0 mini
                  </SelectItem>
                  <SelectItem disabled value="openai/gpt-5.2">
                    Gpt-5.2
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        {/* Creativity */}
        <Controller
          control={form.control}
          name="creativity"
          render={({ field }) => (
            <Field>
              <FieldLabel>سطح خلاقیت</FieldLabel>
              <RadioGroup
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-4"
              >
                <Label>
                  <RadioGroupItem value="LOW" />
                  کم
                </Label>
                <Label>
                  <RadioGroupItem value="MEDIUM" />
                  متعادل
                </Label>
                <Label>
                  <RadioGroupItem value="HIGH" />
                  زیاد
                </Label>
              </RadioGroup>
            </Field>
          )}
        />

        {/* Output Length */}
        <Controller
          control={form.control}
          name="outputLength"
          render={({ field }) => (
            <Field>
              <FieldLabel>طول خروجی</FieldLabel>
              <Select
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="max-w-122">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-w-122">
                  <SelectItem value="SHORT">کوتاه</SelectItem>
                  <SelectItem value="MEDIUM">متوسط</SelectItem>
                  <SelectItem value="LONG">بلند</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <FieldGroup>
          {/* Base Instruction */}
          <Controller
            control={form.control}
            name="systemInstruction"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>دستورالعمل پایه برای هوش مصنوعی</FieldLabel>
                <Textarea
                  {...field}
                  rows={5}
                  className="h-50"
                  placeholder="مثلاً: لحن الهام‌بخش، بدون اغراق تبلیغاتی..."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty}>
              ذخیره تنظیمات
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
