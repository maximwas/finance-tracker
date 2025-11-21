import type * as SelectPrimitive from '@radix-ui/react-select';
import { ErrorMessage, useFormikContext } from 'formik';
import { AlertCircle } from 'lucide-react';
import type { ComponentProps, JSX } from 'react';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TypographyP } from '../ui/typography';

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelectFieldProps extends ComponentProps<typeof SelectPrimitive.Root> {
  options: ISelectOption[];
  placeholder?: string;
  className?: string;
  name: string;
  label: string;
}

function SelectField<T extends Record<string, string>>({
  options,
  className,
  placeholder,
  name,
  label,
  ...props
}: ISelectFieldProps): JSX.Element {
  const { setFieldValue, values } = useFormikContext<T>();

  return (
    <>
      <Label htmlFor={name}>{label}</Label>

      <Select
        name={name}
        value={values[name]}
        onValueChange={(value) => setFieldValue(name, value)}
        {...props}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder ?? ''} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ErrorMessage
        name={name}
        render={(message: string) => (
          <div className="inline-grid grid-flow-col items-center">
            <AlertCircle className="w-4 h-4 text-red-500 mr-1"></AlertCircle>
            <TypographyP className="text-red-500 text-sm">{message}</TypographyP>
          </div>
        )}
      />
    </>
  );
}

export { SelectField };
