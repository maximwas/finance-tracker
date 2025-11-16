import * as React from 'react';

import { WrapperAuth } from '@/components/auth/wrapperAuth';

import { LoginForm } from './LoginForm';

export default async function Login(): Promise<React.JSX.Element> {
  return (
    <WrapperAuth title="Sign in to your financial world">
      <LoginForm></LoginForm>
    </WrapperAuth>
  );
}
