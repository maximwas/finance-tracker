'use client';

import { ErrorMessage } from 'formik';
import { AlertCircle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TypographyP } from '../ui/typography';

export interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  as?: string;
  className?: string;
}

function FormField({
  id,
  label,
  name,
  className,
  type,
  placeholder,
  as = 'input',
}: FormFieldProps): React.JSX.Element {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>{label}</Label>

      <Input as={as} id={id} name={name} type={type} placeholder={placeholder} />

      <ErrorMessage
        name={name}
        render={(message: string) => (
          <div className="inline-grid grid-flow-col items-center">
            <AlertCircle className="w-4 h-4 text-red-500 mr-1"></AlertCircle>
            <TypographyP className="text-red-500 text-sm">{message}</TypographyP>
          </div>
        )}
      />
    </div>
  );
}

export { FormField };
