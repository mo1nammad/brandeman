"use server";

import * as z from "zod";

import { auth } from "@/lib/auth";
import { signinFormSchema as Schema } from "@/schemas/auth";

export async function signinAction(schema: z.infer<typeof Schema>) {
  const validatedSchema = Schema.safeParse(schema);

  if (!validatedSchema.success) {
    return {
      data: null,
      error: new Error("ورودی‌ها معتبر نیستند لطفاً دوباره تلاش کنید."),
    };
  }

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: validatedSchema.data.email,
        password: validatedSchema.data.password,
      },
    });
    return {
      data: response.user,
      error: null,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error,
      };
    }
  }
}
