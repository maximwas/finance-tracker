'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { BarChart3, LayoutDashboard, LogOut, Receipt, Settings, Sparkles, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type JSX, useState } from 'react';

import { cn } from '@/lib/utils';

import { Logo } from '../logo/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
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

export function AppSidebar(): JSX.Element {
  const pathname = usePathname();
  const [optimisticActive, setOptimisticActive] = useState<string | null>(pathname);

  const isActive = (url: string): boolean => optimisticActive === url;

  return (
    <Sidebar>
      <SidebarHeader className="flex-row gap-2 p-4">
        <Logo width={25} height={25} />
        <div className="flex flex-col justify-center gap-1">
          <TypographyH5 className="text-base font-medium bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex gap-2 items-center">
            FinTracker <Sparkles className="w-5 h-5 text-purple-500 font-bold" />
          </TypographyH5>
          <TypographyP className="text-xs text-muted-foreground">Smart Finance</TypographyP>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-linear-to-br from-background/50 to-muted/50 border border-border/50">
            <Avatar className="h-12 w-12 border-2 border-white/50 dark:border-gray-700/50">
              <AvatarImage src="" alt="ІП" />
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white">
                ІП
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate text-foreground">Іван Петренко</p>
            </div>
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu className="relative flex flex-col gap-2">
              {SIDEBAR_MENU.map((item) => (
                <div key={item.id} className="relative">
                  {isActive(item.url) && (
                    <motion.div
                      layoutId="active-indicator"
                      className={cn(
                        'w-full h-full rounded-xl absolute overflow-hidden shadow-lg shadow-primary/25 bg-linear-to-r',
                        item.gradient,
                      )}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 28,
                      }}
                    />
                  )}

                  <SidebarMenuItem className="relative z-10">
                    <SidebarMenuButton
                      asChild
                      onClick={() => setOptimisticActive(item.url)}
                      variant={isActive(item.url) ? 'active' : 'default'}
                    >
                      <Link href={item.url}>
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-all" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
