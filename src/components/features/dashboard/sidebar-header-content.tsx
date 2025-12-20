"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SidebarHeaderContent() {
  const { data } = authClient.useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Card className="h-13 py-0 flex flex-row-reverse items-center justify-between px-1.5 shadow-none">
          <Avatar className="size-8">
            <AvatarFallback className="bg-background text-xs">
              {data?.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h6 className="text-sm">{data?.user.name}</h6>
            <p className="text-xs text-muted-foreground">{data?.user.email}</p>
          </div>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-(--radix-popper-anchor-width)"
      >
        <DropdownMenuItem className="justify-end">
          <button
            className="text-destructive"
            onClick={() => {
              authClient.signOut();
              router.push("/");
            }}
          >
            خروج از حساب کاربری
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
