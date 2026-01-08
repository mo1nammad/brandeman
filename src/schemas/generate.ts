import { z } from "zod";
import { BRAND_STAGES } from "@/lib/constant";

export const fundamentalSchema = z.object({
  brandName: z.string().min(2, "نام برند باید حداقل ۲ کاراکتر باشد"),

  industry: z.string().min(2, "حوزه فعالیت الزامی است"),

  stage: z.enum(BRAND_STAGES, {
    error: "مرحله برند را انتخاب کنید",
  }),

  description: z.string().min(10, "توضیح محصول حداقل ۱۰ کاراکتر باشد"),
});

export type FundamentalFormValues = z.infer<typeof fundamentalSchema>;

export const audienceSchema = z.object({
  audienceType: z.enum(["B2C", "B2B", "BOTH"], {
    error: "نوع مخاطب را انتخاب کنید",
  }),

  idealCustomer: z.string().min(10, "توضیح مخاطب حداقل ۱۰ کاراکتر باشد"),

  painPoints: z.string().min(10, "مشکل یا نیاز مخاطب را توضیح دهید"),

  valueProposition: z.string().min(10, "مزیت رقابتی را شفاف‌تر توضیح دهید"),
});

export type AudienceFormValues = z.infer<typeof audienceSchema>;

export const brandDnaSchema = z.object({
  values: z.array(z.string().min(2)).min(3, "حداقل ۳ ارزش برند را وارد کنید"),

  personality: z.array(z.string()).min(2, "حداقل ۲ ویژگی شخصیتی انتخاب کنید"),

  antiValues: z.string().min(5, "حداقل یک مورد بنویسید"),
});

export type BrandDnaFormValues = z.infer<typeof brandDnaSchema>;

export const positioningSchema = z.object({
  competitors: z.array(z.string().min(2)).min(1, "حداقل یک رقیب وارد کنید"),

  differentiation: z.string().min(10, "وجه تمایز را شفاف‌تر توضیح دهید"),

  desiredFeeling: z.array(z.string()).min(1, "حداقل یک احساس انتخاب کنید"),
});

export type PositioningFormValues = z.infer<typeof positioningSchema>;

export const voiceVisionSchema = z.object({
  toneOfVoice: z.string().min(3, "لحن برند را انتخاب کنید"),
  oneLiner: z.string().min(10, "جمله کوتاه را وارد کنید"),
  vision: z.string().min(10, "چشم‌انداز برند را توضیح دهید"),
  brandGoal: z.string().min(10, "هدف برند را توضیح دهید"),
});

export type VoiceVisionFormValues = z.infer<typeof voiceVisionSchema>;

export const finalFormSchema = z.object({
  audience: audienceSchema,
  brandDna: brandDnaSchema,
  fundamental: fundamentalSchema,
  positioning: positioningSchema,
  voiceVision: voiceVisionSchema,
});
