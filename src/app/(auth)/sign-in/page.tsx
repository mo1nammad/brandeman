import Link from "next/link";
import { SigninForm } from "@/components/features/auth/signin-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-y-3.5">
          <Link href="/" className="text-4xl">
            Logo
          </Link>
          <SigninForm className="w-full" />
        </div>
      </div>
    </div>
  );
}
