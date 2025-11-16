'use client';

import { AuthForm } from '@/components/forms/authForm';
import { type LoginFormValues, loginSchema } from '@/lib/validations/login-schema';

export function LoginForm(): React.JSX.Element {
  return (
    <AuthForm<LoginFormValues>
      title="Sign In"
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
      ]}
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      submitText="Sign In"
      redirectText="Don't have an account?"
      redirectLink="/register"
      redirectLabel="Sign Up"
      onSubmit={(values) => console.log('Login values:', values)}
    />
  );
}
