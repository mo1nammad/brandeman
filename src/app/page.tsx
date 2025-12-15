import { Button } from "@/components/ui/button";
import { getSession } from "@/actions/auth/session";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  return (
    <div className="flex min-h-screen items-center justify-center gap-x-1.5 bg-zinc-50 font-sans dark:bg-black">
      <Button>primary</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"ghost"}>ghost</Button>
      <Button variant={"link"}>link</Button>
      <Button variant={"outline"}>outline</Button>
    </div>
  );
}
