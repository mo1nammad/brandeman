import { Button } from "@/components/ui/button";
import { getSession } from "@/actions/auth/session";
import ColorModeButton from "@/components/color-mode-button";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  return (
    <div className="flex min-h-screen items-center justify-center gap-x-1.5">
      <Button>
        <Link href={"/dashboard"}>dashboard</Link>
      </Button>
      <ColorModeButton />
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"link"}>link</Button>
      <Button variant={"outline"}>outline</Button>
    </div>
  );
}
