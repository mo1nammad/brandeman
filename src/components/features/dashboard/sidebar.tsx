import * as React from "react";

import { Calendar, Inbox, Instagram, Slack } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import SidebarHeaderContent from "./sidebar-header-content";

// Menu items.
const items = [
  {
    title: "برند ها",
    url: "/dashboard/brands",
    icon: Slack,
  },
  {
    title: "پیام ها",
    url: "#",
    icon: Inbox,
  },
  {
    title: "بلاگ ها",
    url: "#",
    icon: Calendar,
  },
  {
    title: "پست های اینستاگرامی",
    url: "#",
    icon: Instagram,
  },
];
export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar dir="rtl" {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>سرویس های من</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
