'use client';

import { useBoolean } from 'ahooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { omit } from 'radash';
import type { JSX } from 'react';
import { useCallback } from 'react';

import { FormField } from '@/components/form/form-field';
import { SelectField } from '@/components/form/select-field';
import { AuthForm } from '@/components/layout/auth-form';
import { useAuth } from '@/contexts/AuthContext';
import { getFirstNameAndLastName } from '@/lib/utils';
import { type SignUpFormValues, signUpSchema } from '@/lib/validations/sign-up-schema';

export function SignUpForm(): JSX.Element {
  const router = useRouter();
  const { signUp } = useAuth();
  const [isSubmit, { setFalse, setTrue }] = useBoolean(false);

  const onSubmit = useCallback(
    async (values: SignUpFormValues) => {
      const userName = getFirstNameAndLastName(values.name);

      try {
        setTrue();
        const res = await signUp({
          ...omit(values, ['name']),
          ...userName,
        });

        if (res.success) {
          setFalse();
          router.replace('/dashboard');
        }
      } catch (error: unknown) {
        setFalse();

        if (axios.isAxiosError(error)) {
          console.error(error.response?.data?.message || 'Something went wrong');
        }
      }
    },
    [router, signUp, setFalse, setTrue],
  );

  return (
    <AuthForm<SignUpFormValues>
      submitText="Sing up"
      redirectText="Already have an account?"
      redirectLink="/sing-in"
      redirectLabel="Sign In"
      initialValues={{
        email: '',
        password: '',
        name: '',
        currency: '',
      }}
      validationSchema={signUpSchema}
      isSubmit={isSubmit}
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <FormField label="Name" id="name" name="name" type="text" placeholder="John Doe" />
      </div>
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
      <div className="space-y-2">
        <SelectField
          label="Currency"
          name="currency"
          className="w-full"
          placeholder="Choose currency"
          options={[
            {
              value: 'UAH',
              label: 'UAH',
            },
            {
              value: 'USD',
              label: 'USD',
            },
          ]}
        />
      </div>
    </AuthForm>
  );
}
