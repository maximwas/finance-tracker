'use client';

import { useFormik } from 'formik';
import { type JSX } from 'react';

import { Label } from './ui/Label';
import { TextInput } from './ui/TextInput';

export interface LoginFormValues {
  email: string;
  password: string;
}

export function Login(): JSX.Element {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log('Login data:', values);
    },
  });

  return (
    <form>
      <Label from="email">Email</Label>
      <TextInput id="#email"></TextInput>
    </form>
  );
}
