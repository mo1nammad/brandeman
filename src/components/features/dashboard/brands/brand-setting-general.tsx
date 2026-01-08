"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { brandGeneralSchema, BrandGeneralFormValues } from "@/schemas/brand";
import { BrandStageEnum, BRAND_STAGES } from "@/lib/constant";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  defaultValues: BrandGeneralFormValues;
};

export default function BrandGeneralSettingsForm({ defaultValues }: Props) {
  const form = useForm<BrandGeneralFormValues>({
    resolver: zodResolver(brandGeneralSchema),
    defaultValues,
  });

  const formSubmit = (val: BrandGeneralFormValues) => {
    console.log(val);
  };

  return (
    <form onSubmit={form.handleSubmit(formSubmit)}>
      <FieldSet className="max-w-3xl">
        <FieldLegend className="text-xl font-bold">
          تنظیمات عمومی برند
        </FieldLegend>

        <FieldDescription>
          این اطلاعات روی تمام خروجی‌های برند و تولیدهای بعدی تأثیر می‌گذارد
        </FieldDescription>

        <FieldGroup>
          {/* Brand name */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>نام برند</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Industry */}
          <Controller
            control={form.control}
            name="industry"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>حوزه فعالیت</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Stage */}
          <Controller
            control={form.control}
            name="stage"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>مرحله برند</FieldLabel>
                <Select
                  dir="rtl"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="max-w-122">
                    <SelectValue placeholder="انتخاب مرحله" />
                  </SelectTrigger>
                  <SelectContent className="max-w-122">
                    <SelectItem value={BRAND_STAGES[BrandStageEnum.IDEA]}>
                      ایده
                    </SelectItem>
                    <SelectItem value={BRAND_STAGES[BrandStageEnum.LAUNCH]}>
                      تازه راه‌اندازی شده
                    </SelectItem>
                    <SelectItem value={BRAND_STAGES[BrandStageEnum.GROWTH]}>
                      در حال رشد
                    </SelectItem>
                    <SelectItem
                      value={BRAND_STAGES[BrandStageEnum.ESTABLISHED]}
                    >
                      تثبیت‌شده
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>توضیح کوتاه</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="توضیح مختصر درباره برند"
                  aria-invalid={fieldState.invalid}
                  className="h-50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty}>
              ذخیره تغییرات
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
