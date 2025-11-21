import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { JSX, ReactNode } from 'react';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getUser } from '@/lib/auth';

export interface IDashboardLayout {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: IDashboardLayout): Promise<JSX.Element> {
  const cookie = await cookies();
  const user = await getUser(cookie.toString());

  if (!user.data) {
    redirect('/sign-in');
  }

  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
