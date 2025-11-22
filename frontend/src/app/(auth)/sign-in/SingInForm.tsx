'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { useCallback } from 'react';

import { FormField } from '@/components/form/form-field';
import { AuthForm } from '@/components/layout/auth-form';
import { useAuth } from '@/contexts/AuthContext';
import { type SingInFormValues, singInSchema } from '@/lib/validations/sing-in-schema';

export function SingInForm(): JSX.Element {
  const router = useRouter();
  const { signIn } = useAuth();

  const onSubmit = useCallback(
    async (values: SingInFormValues) => {
      try {
        const res = await signIn(values);

        if (res.success) {
          router.replace('/dashboard/overview');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data?.message || 'Something went wrong');
        }
      }
    },
    [router, signIn],
  );

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
