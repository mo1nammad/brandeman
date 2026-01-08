"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteBrandModal from "./delete-brand-modal";

type BrandVisibility = "PRIVATE" | "PUBLIC";

type Props = {
  defaultVisibility: BrandVisibility;
  brandName: string;
};

export default function BrandDangerZoneForm({
  defaultVisibility,
  brandName,
}: Props) {
  const [BrandVisibility, setBrandVisibility] = useState(defaultVisibility);

  const updateVisibility = (data: BrandVisibility) => {
    console.log(data);
  };

  const resetBrand = () => {};
  const deleteBrand = () => {};

  return (
    <FieldSet className="rounded-lg">
      <FieldLegend className="text-xl font-bold text-destructive">
        عملیات حساس
      </FieldLegend>

      <FieldDescription>
        عملیات این بخش حساس و غیرقابل بازگشت هستند
      </FieldDescription>

      <FieldGroup>
        {/* Visibility */}

        <Field>
          <FieldLabel>وضعیت نمایش برند</FieldLabel>

          <RadioGroup
            dir="rtl"
            value={BrandVisibility}
            onValueChange={(val) => {
              setBrandVisibility(val as BrandVisibility);
              updateVisibility(val as BrandVisibility);
            }}
            className="flex gap-6"
          >
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="PRIVATE" />
              خصوصی
            </Label>

            <Label className="flex items-center gap-2">
              <RadioGroupItem value="PUBLIC" />
              عمومی
            </Label>
          </RadioGroup>
        </Field>

        {/* Reset Brand */}

        {/* Reset Brand */}
        <Field>
          <FieldLabel>بازسازی برند</FieldLabel>
          <FieldDescription>
            تمام داستان‌ها و خروجی‌ها حذف می‌شوند اما برند باقی می‌ماند
          </FieldDescription>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="sm:max-w-32" type="button" variant="outline">
                ریست برند
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-right">
                  بازسازی برند؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  تمام داستان‌ها و نسخه‌های برند حذف می‌شوند. این عملیات قابل
                  بازگشت نیست.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={resetBrand}>
                  تأیید ریست
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Field>

        {/* Delete Brand */}
        <DeleteBrandModal brandName={brandName} onDelete={deleteBrand} />
      </FieldGroup>
    </FieldSet>
  );
}
