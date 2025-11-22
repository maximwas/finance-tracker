import { type ApiResponse } from '@/types/api';
import { type IGetUserOptions, type User } from '@/types/user';

import { axiosClient } from './axios-client';
import { axiosSSR } from './axios-ssr';

export const getUser = async ({ mode, cookie }: IGetUserOptions): Promise<ApiResponse<User>> => {
  switch (mode) {
    case 'ssr': {
      const response = await axiosSSR.get<ApiResponse<User>>('/auth/me', {
        headers: {
          Cookie: cookie || '',
        },
      });

      return response.data;
    }
    case 'client': {
      const response = await axiosClient.get<ApiResponse<User>>('/auth/me');

      return response.data;
    }
    default:
      throw new Error('Unknown mode');
  }
};
