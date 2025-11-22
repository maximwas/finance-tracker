import axios from 'axios';

import { refreshAccessToken } from '@/service/auth';

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

let isRefreshing = false;

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;

    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        await refreshAccessToken({ mode: 'client' });
        const originalRequest = error.config;

        return axiosClient(originalRequest);
      } catch {
        window.location.href = '/sign-in';
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  },
);
