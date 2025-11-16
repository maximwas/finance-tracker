import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
  name: Yup.string().required('Name is required'),
  currency: Yup.string().required('Currency is required'),
});

export type RegisterFormValues = Yup.InferType<typeof registerSchema>;
