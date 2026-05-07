import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Key, 
  BarChart3, 
  Activity, 
  Bell, 
  Settings,
  Shield
} from "lucide-react"
import { NavMain } from "./NavMain"
import { NavSecondary } from "./NavSecondary"
import { NavUser } from "./NavUser"
import { RoutePaths } from "@/core/routes/route-paths"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: RoutePaths.DASHBOARD,
      icon: <LayoutDashboard />,
      isActive: true,
    },
    {
      title: "API Keys",
      url: RoutePaths.API_KEYS,
      icon: <Key />,
    },
    {
      title: "Trust Analytics",
      url: RoutePaths.TRUST_ANALYTICS,
      icon: <BarChart3 />,
    },
    {
      title: "Transactions",
      url: RoutePaths.TRANSACTIONS,
      icon: <Activity />,
    },
    {
      title: "Webhooks",
      url: RoutePaths.WEBHOOKS,
      icon: <Bell />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: RoutePaths.SETTINGS,
      icon: <Settings />,
    },
  ],
}

import { Link } from "react-router-dom"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SENTRA</span>
                  <span className="truncate text-xs">Fintech Infrastructure</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
