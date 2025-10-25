// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '../styles/globals.css';

import { type JSX } from 'react';

import { ApolloWrapper } from '@/components/apollo/ApolloWrapper';
import { Theme, ThemeProvider } from '@/contexts/ThemeContext';

export interface IRootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IRootLayout): JSX.Element {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ThemeProvider defaultTheme={Theme.Light}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
