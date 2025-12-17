"use server";

import * as z from "zod";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signinFormSchema as Schema } from "@/schemas/auth";

import Response from "@/actions/response";

export async function signinAction(schema: z.infer<typeof Schema>) {
  const validatedSchema = Schema.safeParse(schema);

  if (!validatedSchema.success) {
    return Response.refuse("ورودی‌ها معتبر نیستند لطفاً دوباره تلاش کنید.");
  }

  const userExists = await prisma.user.findUnique({
    where: { email: validatedSchema.data.email },
  });

  if (!userExists)
    return Response.refuse("همچین کاربری وجود ندارد. لطفاً ثبت‌نام کنید.");

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: validatedSchema.data.email,
        password: validatedSchema.data.password,
      },
    });
    return Response.send(response.user);
  } catch (error) {
    if (error instanceof Error) return Response.error(error);
  }
}
