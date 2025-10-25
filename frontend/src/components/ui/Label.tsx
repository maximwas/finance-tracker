import { type JSX, type ReactNode } from 'react';

import { type DefaultUIProps } from '@/types/defaultProps';
import { cn } from '@/utils/cn';

export interface ILabelProps extends DefaultUIProps {
  from: string;
  children: ReactNode;
}

export function Label({ from, className, children }: ILabelProps): JSX.Element {
  return (
    <>
      <label form={from} className={cn('', className)} data-slot="label">
        {children}
      </label>
    </>
  );
}
