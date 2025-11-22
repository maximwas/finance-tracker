import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils/cn';

function TypographyP({ children, className }: ComponentProps<'p'>): JSX.Element {
  return <p className={cn(className)}>{children}</p>;
}

function TypographyH5({ children, className }: ComponentProps<'h5'>): JSX.Element {
  return <h5 className={cn(className)}>{children}</h5>;
}

function TypographyH4({ children, className }: ComponentProps<'h4'>): JSX.Element {
  return <h4 className={cn(className)}>{children}</h4>;
}

export { TypographyH4, TypographyH5, TypographyP };
