'use client';

import { Form, Formik, type FormikProps } from 'formik';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { JSX, ReactNode } from 'react';
import type * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/ui/typography';

import { Spinner } from '../ui/spinner';

interface IAuthFormProps<T extends object> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  submitText: string;
  redirectText?: string;
  redirectLink?: string;
  redirectLabel?: string;
  isSubmit: boolean;
  children: ReactNode | ((formik: FormikProps<T>) => ReactNode);
  onSubmit: (values: T) => void | Promise<void>;
}

function AuthForm<T extends object>({
  initialValues,
  validationSchema,
  submitText,
  redirectText,
  redirectLink,
  redirectLabel,
  isSubmit,
  children,
  onSubmit,
}: IAuthFormProps<T>): JSX.Element {
  return (
    <div className="max-w-md mx-auto">
      <Formik<T>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="space-y-5">
            {typeof children === 'function' ? children(formik) : children}

            <Button
              type="submit"
              className="w-full h-11 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isSubmit ? (
                <>
                  <Spinner />
                  Please wait
                </>
              ) : (
                <>
                  {submitText}
                  <ArrowRight className="w-4 h-4 mt-0.5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>

            {redirectText ? (
              <TypographyP className="text-center font-medium">
                {redirectText}{' '}
                <Link href={redirectLink || ''} className="text-purple-600">
                  {redirectLabel}
                </Link>
              </TypographyP>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AuthForm };
