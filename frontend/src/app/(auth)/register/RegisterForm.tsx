'use client';

import { AuthForm } from '@/components/forms/authForm';
import { type RegisterFormValues, registerSchema } from '@/lib/validations/register-schema';

export function RegisterForm(): React.JSX.Element {
  return (
    <AuthForm<RegisterFormValues>
      title="Sign Up"
      fields={[
        { name: 'name', label: 'Name', placeholder: 'John Doe' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
        {
          name: 'currency',
          label: 'Currency',
          placeholder: 'Currency',
          options: ['UAH', 'EUR', 'USD'],
        },
      ]}
      initialValues={{
        name: '',
        email: '',
        password: '',
        currency: '',
      }}
      validationSchema={registerSchema}
      submitText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Sign In"
      onSubmit={(values) => console.log('Register values:', values)}
    />
  );
}
