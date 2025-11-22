import axios, { type AxiosResponse } from 'axios';
import { notFound, redirect } from 'next/navigation';

import { type ApiResponse } from '@/types/api';
import { getCookie } from '@/utils/cookie';
import { hash } from '@/utils/hash';

export const axiosSSR = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

let isRefreshing = false;

async function refreshTokensSSR(
  response: AxiosResponse<ApiResponse>,
): Promise<AxiosResponse | null> {
  try {
    const token = getCookie(response.config.headers.Cookie, process.env.NEXT_REFRESH_TOKEN_KEY!);
    const times = Date.now().toString();
    const res = await axiosSSR.get<ApiResponse>('/auth/refresh', {
      headers: {
        'x-request-ssr': 'true',
        'x-times-ssr': times,
        'x-signature-ssr': hash(`${token}.${times}`, process.env.NEXT_SSR_SECRET!),
        Cookie: response.config.headers.Cookie || '',
      },
    });

    const { headers } = res;
    const setCookie = headers['set-cookie'];

    if (setCookie) {
      response.config.headers.Cookie = setCookie.map((cookie) => cookie.split(';')[0]).join('; ');
    }

    return response;
  } catch {
    return null;
  }
}

axiosSSR.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;

    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      const newResponse = await refreshTokensSSR(error.response);

      isRefreshing = false;

      if (newResponse) {
        return axiosSSR(newResponse.config);
      }

      redirect('/sign-in');
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
