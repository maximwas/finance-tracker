import { type ApiResponse } from '@/types/api';

import { axiosClient } from './axios-client';
import { axiosSSR } from './axios-ssr';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IGetUserOptions {
  cookie?: string;
  isSSR?: boolean;
}

export const getUser = async ({ isSSR, cookie }: IGetUserOptions = {}): Promise<
  ApiResponse<User>
> => {
  if (isSSR) {
    const response = await axiosSSR.get<ApiResponse<User>>('/auth/me', {
      headers: {
        Cookie: cookie || '',
      },
    });

    return response.data;
  }

  const response = await axiosClient.get<ApiResponse<User>>('/auth/me');

  return response.data;
};
