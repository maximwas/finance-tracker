import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Невірний email').required('Обовʼязкове поле'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обовʼязкове поле'),
});
