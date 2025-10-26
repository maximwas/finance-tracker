import * as React from 'react';

import { cn } from '@/lib/utils';

function TypographyP({ children, className }: React.ComponentProps<'p'>): React.JSX.Element {
  return <p className={cn(className)}>{children}</p>;
}

export { TypographyP };
