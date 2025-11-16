'use client';

import { Form, Formik } from 'formik';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import type * as Yup from 'yup';

import { FormField } from '@/components/form/formField';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TypographyP } from '@/components/ui/typography';

interface IAuthFormProps<T extends object> {
  title: string;
  fields: {
    name: keyof T;
    label: string;
    type?: string;
    placeholder?: string;
    options?: string[];
  }[];
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  submitText: string;
  redirectText: string;
  redirectLink: string;
  redirectLabel: string;
  onSubmit: (values: T) => void | Promise<void>;
}

export function AuthForm<T extends object>({
  title,
  fields,
  initialValues,
  validationSchema,
  submitText,
  redirectText,
  redirectLink,
  redirectLabel,
  onSubmit,
}: IAuthFormProps<T>): React.JSX.Element {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

      <Formik<T>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-5">
          {fields.map((field) =>
            field.options ? (
              <Select key={String(field.name)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder ?? ''} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div key={String(field.name)} className="space-y-2">
                <FormField
                  label={field.label}
                  id={String(field.name)}
                  name={String(field.name)}
                  type={field.type ?? 'text'}
                  placeholder={field.placeholder ?? ''}
                />
              </div>
            ),
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {submitText}
            <ArrowRight className="w-4 h-4 mt-0.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <TypographyP className="text-center font-medium">
            {redirectText}{' '}
            <Link href={redirectLink} className="text-purple-600">
              {redirectLabel}
            </Link>
          </TypographyP>
        </Form>
      </Formik>
    </div>
  );
}
