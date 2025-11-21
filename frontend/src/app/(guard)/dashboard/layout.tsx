import type { JSX, ReactNode } from 'react';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
