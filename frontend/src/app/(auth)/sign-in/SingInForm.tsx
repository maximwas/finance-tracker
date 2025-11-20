'use client';
import { useCallback } from 'react';

import { FormField } from '@/components/form/formField';
import { AuthForm } from '@/components/forms/authForm';
import { type SingInFormValues, singInSchema } from '@/lib/validations/sing-in-schema';

export function SingInForm(): React.JSX.Element {
  const onSubmit = useCallback(() => {}, []);

  return (
    <AuthForm<SingInFormValues>
      submitText="Sign in"
      redirectText="Don't have an account?"
      redirectLink="/sing-up"
      redirectLabel="Sign Up"
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={singInSchema}
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
