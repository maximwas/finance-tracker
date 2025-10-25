import { type ChangeEvent, type FormEvent, type JSX } from 'react';

import { type DefaultUIProps } from '@/types/defaultProps';
import { cn } from '@/utils/cn';

export interface ITextInputProps extends DefaultUIProps {
  id: string;
  value: string;
  onInput?: (value: string, event: FormEvent<HTMLInputElement>) => void;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  id,
  value,
  onInput,
  onChange,
  className,
}: ITextInputProps): JSX.Element {
  return (
    <>
      <input
        id={id}
        className={cn('', className)}
        data-slot="text-input"
        type="text"
        onInput={(event) => onInput?.(event.currentTarget.value, event)}
        onChange={(event) => onChange?.(event.currentTarget.value, event)}
        value={value}
      />
    </>
  );
}
