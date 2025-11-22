import { Field, type FieldAttributes } from 'formik';
import type { JSX } from 'react';

import { cn } from '@/utils/cn';

export type IInput<T extends Record<string, string>> = FieldAttributes<T>;

function Input<T extends Record<string, string>>({ className, ...props }: IInput<T>): JSX.Element {
  return (
    <Field
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
