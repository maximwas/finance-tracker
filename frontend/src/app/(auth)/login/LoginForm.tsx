'use client';

import { Form, Formik } from 'formik';
import * as React from 'react';

import { FormField } from '@/components/form/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validations/login-schema';

export interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginForm(): React.JSX.Element {
  return (
    <Formik<LoginFormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(value) => {
        console.log('value ', value);
      }}
    >
      <Form className="space-y-5">
        <div className="space-y-2">
          <FormField
            as={Input}
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
          ></FormField>
        </div>
        <div className="space-y-2">
          <FormField
            as={Input}
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="********"
          ></FormField>
        </div>

        <div>
          <Button>Sign in</Button>
        </div>
      </Form>
    </Formik>
  );
}
