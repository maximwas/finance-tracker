import { type JSX } from 'react';

import { cn } from '@/lib/utils';
import { type DefaultUIProps } from '@/types/defaultProps';

export interface IBubbleProps extends DefaultUIProps {
  animationDelay?: number;
}

export function Bubble({ className, animationDelay }: IBubbleProps): JSX.Element {
  return (
    <div
      className={cn(
        'absolute rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float',
        className,
      )}
      style={{
        animationDelay: `${animationDelay || 0}s`,
      }}
    ></div>
  );
}
