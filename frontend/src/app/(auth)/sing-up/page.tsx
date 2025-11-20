import * as React from 'react';

import { WrapperAuth } from '@/components/layout/wrapper-auth';

import { SignUpForm } from './SignUpForm';

export default function Register(): React.JSX.Element {
  return (
    <WrapperAuth title="Create your financial profile">
      <SignUpForm></SignUpForm>
    </WrapperAuth>
  );
}
