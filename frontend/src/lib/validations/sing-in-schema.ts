import * as Yup from 'yup';

export const singInSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email must be an email'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type SingInFormValues = Yup.InferType<typeof singInSchema>;
