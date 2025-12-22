"use client";

import { useGenerateSteps } from "@/store/use-generate-steps";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FundamentalFormValues, fundamentalSchema } from "@/schemas/generate";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FundamentalForm() {
  const { setStep, step, setFormValues } = useGenerateSteps();
  // form
  const form = useForm<FundamentalFormValues>({
    resolver: zodResolver(fundamentalSchema),
    defaultValues: {
      brandName: "",
      industry: "",
      productDescription: "",
      stage: "IDEA",
    },
  });
  const onSubmit = (data: FundamentalFormValues) => {
    setFormValues("fundamental", data);
    setStep(step + 1);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend className="text-xl font-bold">
          اطلاعات پایه ای برند شما
        </FieldLegend>
        <FieldDescription>
          در این قسمت اطلاعاتی همچپن نام , حوزه فعالیت و ... را وارد خواهید کرد
        </FieldDescription>
        <FieldGroup>
          <Controller
            control={form.control}
            name="brandName"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>نام برند چیست؟</FieldLabel>
                <Input
                  {...field}
                  placeholder="دیجی‌کالا، کافه نادری، استارتاپ X"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="industry"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>برند شما در چه حوزه‌ای فعالیت می‌کند؟</FieldLabel>
                <Input
                  {...field}
                  placeholder="مثال‌ها: SaaS، فروشگاه آنلاین، کافه، آموزش، فین‌تک، سلامت"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="stage"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>برند شما در چه مرحله‌ای است؟</FieldLabel>
                <Select
                  dir="rtl"
                  defaultValue={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger className="max-w-150">
                    <SelectValue placeholder="یک وضعیت را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="max-w-150">
                    <SelectItem value="IDEA">ایده</SelectItem>
                    <SelectItem value="LAUNCH">تازه راه‌اندازی شده</SelectItem>
                    <SelectItem value="GROWTH">در حال رشد</SelectItem>
                    <SelectItem value="ESTABLISHED">برند تثبیت‌شده</SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="productDescription"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>محصول یا خدمت اصلی شما چیست؟</FieldLabel>
                <Textarea
                  {...field}
                  id="what_is_your_product"
                  placeholder="در یک یا دو جمله توضیح بده"
                  className="max-w-150"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-between">
            <Button className="w-22">بعدی</Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
