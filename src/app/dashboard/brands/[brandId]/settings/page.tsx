import Link from "next/link";
import { redirect } from "next/navigation";
import { MoveRight } from "lucide-react";

import { getSession } from "@/actions/auth/session";
import { getBrand } from "@/actions/dashboard/brands/get-brand";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

import BrandGeneralSettingsForm from "@/components/features/dashboard/brands/brand-setting-general";
import BrandSettingTab from "@/components/features/dashboard/brands/brand-setting-tab";
import BrandPromptSettingsForm from "@/components/features/dashboard/brands/brand-setting-prompt";
import BrandDangerZoneForm from "@/components/features/dashboard/brands/brand-setting-danger";

type Props = {
  params: Promise<{
    brandId: string;
  }>;
};

export default async function BrandPageSetting({ params }: Props) {
  const auth = await getSession();

  if (!auth?.session.userId) redirect("/login");
  const userId = auth.session.userId;
  const { brandId } = await params;

  const brand = await getBrand({ brandId, userId });

  if (brand.error || !brand.data) redirect("/dashboard/brands");

  // questionaries
  const questionnaries = {
    extraJson: brand.data.brandQuestionnaire?.extra as
      | {
          creativity: "LOW" | "MEDIUM" | "HIGH";
          outputLength: "MEDIUM" | "SHORT" | "LONG";
          [x: string]: string | undefined;
        }
      | undefined,
  };

  return (
    <>
      <Link href={`/dashboard/brands/${brandId}`}>
        <Button variant="link" size="sm" className="mb-3.5">
          <MoveRight />
          بازگشت به صفحه قبلی
        </Button>
      </Link>

      <BrandSettingTab>
        <TabsContent value="general">
          <BrandGeneralSettingsForm
            defaultValues={{
              industry: brand.data.industry,
              name: brand.data.name,
              stage: brand.data.stage,
              description: brand.data.description ?? undefined,
            }}
          />
        </TabsContent>

        <TabsContent value="prompt">
          <BrandPromptSettingsForm
            defaultValues={{
              aiModel: brand.data.model,
              creativity: questionnaries?.extraJson?.creativity ?? "MEDIUM",
              outputLength: questionnaries?.extraJson?.outputLength ?? "MEDIUM",
              languageHint: questionnaries?.extraJson?.languageHint,
              systemInstruction: questionnaries?.extraJson?.systemInstruction,
            }}
          />
        </TabsContent>

        <TabsContent value="danger">
          <BrandDangerZoneForm
            defaultVisibility={brand.data.visibility}
            brandName={brand.data.name}
          />
        </TabsContent>
      </BrandSettingTab>
    </>
  );
}
