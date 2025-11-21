'use client';

import { useCallback } from 'react';
import type { JSX } from 'react';

import { FormField } from '@/components/form/form-field';
import { SelectField } from '@/components/form/select-field';
import { AuthForm } from '@/components/layout/auth-form';
import { getFirstNameAndLastName } from '@/lib/utils';
import { type SignUpFormValues, signUpSchema } from '@/lib/validations/sign-up-schema';

export function SignUpForm(): JSX.Element {
  const onSubmit = useCallback((values: SignUpFormValues) => {
    const userName = getFirstNameAndLastName(values.name);
    console.log('🚀 ~ SignUpForm ~ userName:', userName);
  }, []);

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
