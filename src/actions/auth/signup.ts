"use server";

import * as z from "zod";

import { createClient } from "@/lib/supabase/server";
import { signupFormSchema as Schema } from "@/schemas/auth";
import { WEBSITE_URL } from "@/lib/constant";
import { AuthError } from "@supabase/supabase-js";

export async function signupAction(schema: z.infer<typeof Schema>) {
  const supabase = await createClient();

  const validateSchema = Schema.safeParse(schema);

  if (!validateSchema.success)
    return {
      error: new AuthError("لطفا فرم ثبت نام را به درستی پر کنید"),
      data: {
        user: null,
        session: null,
      },
    };

  if (schema.password !== schema.confirmPassword)
    return {
      error: new AuthError("رمز های ورود یکسان نیستند"),
      data: {
        user: null,
        session: null,
      },
    };

  const data = await supabase.auth.signUp({
    email: schema.email,
    password: schema.password,
    options: {
      emailRedirectTo: `${WEBSITE_URL}/sign-in`,
    },
  });

  return data;
}
