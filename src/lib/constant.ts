export const WEBSITE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_URL
    : "http://localhost:3000";

export const BRAND_STAGES = [
  "IDEA",
  "LAUNCH",
  "GROWTH",
  "ESTABLISHED",
] as const;

export enum BrandStageEnum {
  IDEA,
  LAUNCH,
  GROWTH,
  ESTABLISHED,
}
export type BrandStage = (typeof BRAND_STAGES)[number];

export const aiModels = [
  "openai/gpt-4.1",
  "openai/gpt-4.0 mini",
  "openai/gpt-5.0 mini",
  "openai/gpt-5.2",
] as const;
