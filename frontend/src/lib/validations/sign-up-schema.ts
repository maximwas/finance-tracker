import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(128, 'Name must be at least 128 characters long'),

  email: Yup.string().required('Email is required').email('Email must be an email'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  currency: Yup.string().required('Currency is required'),
});

export type SignUpFormValues = Yup.InferType<typeof signUpSchema>;
