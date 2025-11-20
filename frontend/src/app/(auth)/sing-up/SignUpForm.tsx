'use client';

import { useCallback } from 'react';

import { FormField } from '@/components/form/formField';
import { SelectField } from '@/components/form/selectField';
import { AuthForm } from '@/components/forms/authForm';
import { type SignUpFormValues, signUpSchema } from '@/lib/validations/sign-up-schema';

export function SignUpForm(): React.JSX.Element {
  const onSubmit = useCallback(() => {}, []);

  return (
    <AuthForm<SignUpFormValues>
      submitText="Sing up"
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Sign In"
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        currency: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <FormField
          label="First name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="John"
        />
      </div>
      <div className="space-y-2">
        <FormField label="Last name" id="lastName" name="lastName" type="text" placeholder="Doe" />
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
