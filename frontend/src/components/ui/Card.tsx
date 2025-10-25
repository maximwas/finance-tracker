import { type JSX, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface ICardProps {
  children?: ReactNode;
  className?: string;
}

export function Card({ children, className }: ICardProps): JSX.Element {
  return (
    <div data-slot="card" className={cn('bg-white rounded-xl border shadow-2xl', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: ICardProps): JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: ICardProps): JSX.Element {
  return (
    <h4 data-slot="card-title" className={cn('leading-none', className)}>
      {children}
    </h4>
  );
}

export function CardDescription({ className, children }: ICardProps): JSX.Element {
  return (
    <p data-slot="card-description" className={cn('text-muted-foreground', className)}>
      {children}
    </p>
  );
}

export function CardAction({ className, children }: ICardProps): JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children }: ICardProps): JSX.Element {
  return (
    <div data-slot="card-content" className={cn('px-6 last:pb-6', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: React.ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 pb-6 [.border-t]:pt-6', className)}
    >
      {children}
    </div>
  );
}
