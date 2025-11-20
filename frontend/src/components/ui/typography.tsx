import * as React from 'react';

import { cn } from '@/lib/utils';

function TypographyP({ children, className }: React.ComponentProps<'p'>): React.JSX.Element {
  return <p className={cn(className)}>{children}</p>;
}

function TypographyH5({ children, className }: React.ComponentProps<'h5'>): React.JSX.Element {
  return <h5 className={cn(className)}>{children}</h5>;
}

function TypographyH4({ children, className }: React.ComponentProps<'h4'>): React.JSX.Element {
  return <h4 className={cn(className)}>{children}</h4>;
}

export { TypographyH4, TypographyH5, TypographyP };
