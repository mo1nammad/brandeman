import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>ساخت حساب کاربری</CardTitle>
        <CardDescription>
          برای ساخت حساب کاربری ابتدا فرم زیر را کامل کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">نام کاربری</FieldLabel>
              <Input id="name" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">ایمیل</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription className="text-xs -mt-1!">
                ما از این ایمیل برای ارتباط با شما استفاده خواهیم کرد و این
                ایمیل با هیچ فرد دیگری به اشتراک گذاشته نخواهد شد
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">رمز ورود</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription className="text-xs -mt-1!">
                حداقل باید هشت کارکتر وارد کنید
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                تاییدیه رمز عبور
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription className="text-xs -mt-1!">
                لطفا رمز عبور خود را تایید کنید
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">ساخت حساب</Button>
                <Button variant="outline" type="button">
                  ساخت حساب با اکانت گوگل{" "}
                  <svg
                    className="size-3"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Google</title>
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </Button>
                <FieldDescription className="px-6 text-center">
                  <span>قبلا ثبت نام کردید؟</span>
                  <Link href="/sign-in" className="mr-0.5">
                    ورود
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
