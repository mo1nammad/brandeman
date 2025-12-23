import type {
  AudienceFormValues,
  BrandDnaFormValues,
  FundamentalFormValues,
  PositioningFormValues,
  VoiceVisionFormValues,
} from "@/schemas/generate";

export type BrandFormValuesOptional = {
  audience?: AudienceFormValues;
  brandDna?: BrandDnaFormValues;
  fundamental?: FundamentalFormValues;
  positioning?: PositioningFormValues;
  voiceVision?: VoiceVisionFormValues;
};

export type BrandFormValues = Required<BrandFormValuesOptional>;
