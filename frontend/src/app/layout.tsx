// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '../styles/globals.css';

import type { JSX, ReactNode } from 'react';

import { ApolloWrapper } from '@/components/apollo/apollo-wrapper';
import { AuthProvider } from '@/contexts/AuthContext';
import { Theme, ThemeProvider } from '@/contexts/ThemeContext';

export interface IRootLayout {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayout): JSX.Element {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <AuthProvider>
          <ThemeProvider defaultTheme={Theme.Light}>
            {/* <ApolloWrapper>{children}</ApolloWrapper> */}
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
