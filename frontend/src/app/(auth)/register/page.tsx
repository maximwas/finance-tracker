import * as React from 'react';

import { WrapperAuth } from '@/components/auth/wrapperAuth';

import { RegisterForm } from './RegisterForm';

export default function Register(): React.JSX.Element {
  return (
    <WrapperAuth title="Create your financial profile">
      <RegisterForm></RegisterForm>
    </WrapperAuth>
  );
}
