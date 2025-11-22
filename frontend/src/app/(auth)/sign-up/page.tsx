import type { JSX } from 'react';

import { WrapperAuth } from '@/components/layout/wrapper-auth';

import { SignUpForm } from './SignUpForm';

export default function Register(): JSX.Element {
  return (
    <WrapperAuth title="Create your financial profile">
      <SignUpForm></SignUpForm>
    </WrapperAuth>
  );
}
