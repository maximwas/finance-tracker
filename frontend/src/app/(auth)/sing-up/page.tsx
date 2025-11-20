import * as React from 'react';

import { WrapperAuth } from '@/components/auth/wrapperAuth';

import { SignUpForm } from './SignUpForm';

export default function Register(): React.JSX.Element {
  return (
    <WrapperAuth title="Create your financial profile">
      <SignUpForm></SignUpForm>
    </WrapperAuth>
  );
}
