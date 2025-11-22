import axios from 'axios';
import { redirect } from 'next/navigation';

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api`,
  withCredentials: true,
});

let isRefreshing = false;

async function refreshTokensClient(): Promise<boolean> {
  try {
    await axiosClient.get('/auth/refresh');
    return true;
  } catch {
    return false;
  }
}

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.status;

    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      const refreshed = await refreshTokensClient();

      isRefreshing = false;

      if (refreshed) {
        const originalRequest = error.config;
        return axiosClient(originalRequest);
      }

      redirect('/sign-in');
    }

    throw error;
  },
);
