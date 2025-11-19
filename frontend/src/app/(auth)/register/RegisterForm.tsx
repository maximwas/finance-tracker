'use client';

import { useCallback } from 'react';

import { FormField } from '@/components/form/formField';
import { SelectField } from '@/components/form/selectField';
import { AuthForm } from '@/components/forms/authForm';
import { type RegisterFormValues, registerSchema } from '@/lib/validations/register-schema';

export function RegisterForm(): React.JSX.Element {
  const onSubmit = useCallback(() => {}, []);

  return (
    <AuthForm<RegisterFormValues>
      submitText="Sing up"
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Sign In"
      initialValues={{
        email: '',
        password: '',
        name: '',
        currency: '',
      }}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <FormField label="Name" id="name" name="name" type="name" placeholder="John Doe" />
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
