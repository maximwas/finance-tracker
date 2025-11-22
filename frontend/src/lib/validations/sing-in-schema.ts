import * as Yup from 'yup';

export const singInSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email must be an email'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export type SingInFormValues = Yup.InferType<typeof singInSchema>;
