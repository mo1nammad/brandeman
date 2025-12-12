import { SignupForm } from "@/components/features/auth/signup-form";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-y-3.5">
          <Link href="/" className="text-4xl">
            Logo
          </Link>
          <SignupForm className="w-full" />
        </div>
      </div>
    </div>
  );
}
