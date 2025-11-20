import * as React from 'react';

import { WrapperAuth } from '@/components/layout/wrapper-auth';

import { SingInForm } from './SingInForm';

export default async function Login(): Promise<React.JSX.Element> {
  return (
    <WrapperAuth title="Sign in to your financial world">
      <SingInForm></SingInForm>
    </WrapperAuth>
  );
}
