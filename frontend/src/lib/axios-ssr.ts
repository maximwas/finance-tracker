import axios from 'axios';
import { notFound, redirect } from 'next/navigation';

import { refreshAccessToken } from '@/service/auth';
import { getCookie } from '@/utils/cookie';

export const axiosSSR = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

let isRefreshing = false;

axiosSSR.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;

    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const refreshToken = getCookie(
          error.response.config.headers.Cookie,
          process.env.NEXT_REFRESH_TOKEN_KEY!,
        );

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const newAccessToken = await refreshAccessToken({ mode: 'ssr', refreshToken });

        error.response.config.headers.Cookie = `${process.env.NEXT_ACCESS_TOKEN_KEY}=${newAccessToken}; ${process.env.NEXT_REFRESH_TOKEN_KEY}=${refreshToken}`;

        return axiosSSR(error.response.config);
      } catch {
        redirect('/sign-in');
      } finally {
        isRefreshing = false;
      }
    }

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
