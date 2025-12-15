import * as z from "zod";

export const signinFormSchema = z.object({
  email: z
    .email()
    .min(1, "ایمیل وارد نشده است")
    .max(256, "حداکثر کارکتر قابل قبول 256 واحد است")
    .trim(),
  password: z
    .string()
    .min(1, "رمز عبور وارد نشده است")
    .max(1024, "حداکثر کارکتر قابل قبول 1024 واحد است"),
});

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(4, "حداقل ورود 4 کارکتر الزامیست")
    .max(64, "حداکثر کارکتر قابل قبول 64 واحد است")
    .trim(),
  email: z
    .email()
    .min(1, "ایمیل وارد نشده است")
    .max(128, "حداکثر کارکتر قابل قبول 128 واحد است")
    .trim(),
  password: z
    .string()
    .min(8, "حداقل ورود 8 کارکتر الزامیست")
    .max(64, "حداکثر کارکتر قابل قبول 64 واحد است")
    // .regex(/[a-zA-Z]/, { error: "حداقل یک حرف را دارا باشد" })
    // .regex(/[0-9]/, { error: "حداقل دارای یک حرف باشد" })
    // .regex(/[^a-zA-Z0-9]/, {
    //   error: "حداقل دارای یک حرف خاص باشد مثل * یا !",
    // })
    .trim(),
  confirmPassword: z
    .string()
    .min(6, "حداقل ورود 6 کارکتر الزامیست")
    .max(64, "حداکثر کارکتر قابل قبول 64 واحد است"),
});
