"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { signupFormSchema as Schema } from "@/schemas/auth";

import Response from "@/actions/response";

export async function signupAction(schema: z.infer<typeof Schema>) {
  const validatedSchema = Schema.safeParse(schema);

  if (!validatedSchema.success)
    return Response.refuse("ورودی‌ها معتبر نیستند لطفاً دوباره تلاش کنید.");

  if (schema.confirmPassword !== schema.password)
    return Response.refuse("رمز عبور و تکرار رمز عبور مطابقت ندارند.");

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: validatedSchema.data.email,
        name: validatedSchema.data.name,
        password: validatedSchema.data.password,
        callbackURL: "/",
      },
    });

    return Response.send(response.user);
  } catch (error) {
    if (error instanceof Error) return Response.error(error);
  }
}
