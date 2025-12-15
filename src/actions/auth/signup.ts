"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { signupFormSchema as Schema } from "@/schemas/auth";

export async function signupAction(schema: z.infer<typeof Schema>) {
  const validatedSchema = Schema.safeParse(schema);

  if (!validatedSchema.success) {
    return {
      data: null,
      error: new Error("ورودی‌ها معتبر نیستند لطفاً دوباره تلاش کنید."),
    };
  }

  if (schema.confirmPassword !== schema.password) {
    return {
      data: null,
      error: new Error("رمز عبور و تکرار رمز عبور مطابقت ندارند."),
    };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: validatedSchema.data.email,
        name: validatedSchema.data.name,
        password: validatedSchema.data.password,
        callbackURL: "/",
      },
    });

    return { data: response.user, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error,
      };
    }
  }
}
