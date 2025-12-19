"use client";

import { authClient } from "@/lib/auth-client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function SidebarHeaderContent() {
  const { data, isPending } = authClient.useSession();

  return (
    <Card className="h-12 py-0 flex flex-row items-center justify-between px-1.5">
      <Avatar className="size-8 rounded-full overflow-hidden text-sm">
        <AvatarFallback className="bg-background flex justify-center items-center size-full">
          {data?.user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </Card>
  );
}
