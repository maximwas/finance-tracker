import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { JSX, ReactNode } from 'react';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserProvider } from '@/contexts/UserContext';
import { getUser } from '@/lib/user';

export interface IDashboardLayout {
  children: ReactNode;
}

export default async function GuardLayout({ children }: IDashboardLayout): Promise<JSX.Element> {
  const cookie = await cookies();
  const user = await getUser({
    isSSR: true,
    cookie: cookie.toString(),
  });

  if (!user.data) {
    redirect('/sign-in');
  }

  return (
    <UserProvider initialUser={null}>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <main>{children}</main>
      </SidebarProvider>
    </UserProvider>
  );
}
