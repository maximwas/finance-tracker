import axios, { type InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { refreshAccessToken } from '@/service/auth';

export const axiosSSR = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

let refreshSubscribers: ((token: string) => void)[] = [];

function setAccessTokenInCookie(config: InternalAxiosRequestConfig, token: string): void {
  config.headers.Cookie = `${process.env.NEXT_ACCESS_TOKEN_KEY}=${token}`;
}

function onRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

let isRefreshing = false;

axiosSSR.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;
    const originalRequest = error.config;

    if (status === 401 && !isRefreshing) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            setAccessTokenInCookie(originalRequest, token);
            resolve(axiosSSR(originalRequest));
          });
        });
      }

      isRefreshing = true;

      const cookie = await cookies();

      try {
        const refreshToken = cookie.get(process.env.NEXT_REFRESH_TOKEN_KEY!)?.value;

        if (!refreshToken) {
          redirect('/sign-in');
        }

        const newAccessToken = await refreshAccessToken({ mode: 'ssr', refreshToken });

        onRefreshed(newAccessToken);
        setAccessTokenInCookie(error.response.config, newAccessToken);

        return axiosSSR(error.response.config);
      } catch {
        cookie.delete(process.env.NEXT_ACCESS_TOKEN_KEY!);
        cookie.delete(process.env.NEXT_REFRESH_TOKEN_KEY!);
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
