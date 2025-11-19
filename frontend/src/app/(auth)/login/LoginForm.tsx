'use client';
import { useCallback } from 'react';

import { FormField } from '@/components/form/formField';
import { AuthForm } from '@/components/forms/authForm';
import { type LoginFormValues, loginSchema } from '@/lib/validations/login-schema';

export function LoginForm(): React.JSX.Element {
  const onSubmit = useCallback(() => {}, []);

  return (
    <AuthForm<LoginFormValues>
      submitText="Sign in"
      redirectText="Don't have an account?"
      redirectLink="/register"
      redirectLabel="Sign Up"
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
        />
      </div>
      <div className="space-y-2">
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="********"
        />
      </div>
    </AuthForm>
  );
}
