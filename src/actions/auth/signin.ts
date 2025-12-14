"use server";

import * as z from "zod";

import { createClient } from "@/lib/supabase/server";
import { signinFormSchema as Schema } from "@/schemas/auth";
import { WEBSITE_URL } from "@/lib/constant";

export async function signinAction(schema: z.infer<typeof Schema>) {
  const supabase = await createClient();
  const data = await supabase.auth.signInWithPassword({
    email: schema.email,
    password: schema.password,
  });

  return data;
}
