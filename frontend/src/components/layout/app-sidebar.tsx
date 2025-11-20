import { BarChart3, LayoutDashboard, Receipt, Settings, Sparkles, Tag } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Logo } from '../logo/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar';
import { TypographyH5, TypographyP } from '../ui/typography';

export interface ISidebarMenu {
  id: string;
  label: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
}

const SIDEBAR_MENU: ISidebarMenu[] = [
  {
    id: 'overview',
    icon: LayoutDashboard,
    url: '/dashboard/overview',
    label: 'Overview',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'expenses',
    icon: Receipt,
    url: '/dashboard/expenses',
    label: 'Expenses',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'categories',
    icon: Tag,
    url: '/dashboard/categories',
    label: 'Categories',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'reports',
    icon: BarChart3,
    url: '/dashboard/reports',
    label: 'Reports',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'settings',
    icon: Settings,
    url: '/dashboard/settings',
    label: 'Settings',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export function AppSidebar(): React.JSX.Element {
  return (
    <Sidebar className="">
      <SidebarHeader>
        <div className="flex gap-2 px-3 py-4">
          <Logo width={25} height={25}></Logo>
          <div className="flex flex-col justify-center gap-1">
            <TypographyH5 className="text-base bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex gap-2 items-center">
              FinTracker
              <Sparkles className="w-5 h-5 text-purple-500" />
            </TypographyH5>
            <TypographyP className="text-xs text-muted-foreground">Smart Finance</TypographyP>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
