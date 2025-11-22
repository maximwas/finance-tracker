import axios from 'axios';
import { notFound, redirect } from 'next/navigation';

export const axiosSSR = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

axiosSSR.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;

    switch (status) {
      case 403:
        redirect('/403');
      case 404:
        notFound();
      case 500:
        redirect('/500');
      default:
        throw error;
    }
  },
);
