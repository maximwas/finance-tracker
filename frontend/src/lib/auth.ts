import { type ApiResponse } from '@/types/api';
import { type IUserName } from '@/utils/name';

import {
  HEADER_REQUEST_SSR,
  HEADER_SIGNATURE_SSR,
  HEADER_TIMES_SSR,
} from '../../../shared/constants';
import { hash } from '../../../shared/utils/hash';
import { axiosClient } from './axios-client';
import { axiosSSR } from './axios-ssr';
import { type SignUpFormValues } from './validations/sign-up-schema';
import { type SingInFormValues } from './validations/sing-in-schema';

export const signUp = async (
  body: Omit<SignUpFormValues, 'name'> & IUserName,
): Promise<ApiResponse> => {
  const response = await axiosClient.post<ApiResponse>('/auth/signup', body);

  return response.data;
};

export const signIn = async (body: SingInFormValues): Promise<ApiResponse> => {
  const response = await axiosClient.post<ApiResponse>('/auth/login', body);

  return response.data;
};

export const logout = async (): Promise<ApiResponse> => {
  const response = await axiosClient.get<ApiResponse>('/auth/logout');

  return response.data;
};

export const refreshAccessTokenSSR = async (refreshToken: string): Promise<string> => {
  const times = Date.now().toString();
  const res = await axiosSSR.get<{ access_token: string }>('/auth/refresh', {
    headers: {
      [HEADER_REQUEST_SSR]: 'true',
      [HEADER_TIMES_SSR]: times,
      [HEADER_SIGNATURE_SSR]: hash(`${refreshToken}.${times}`, process.env.NEXT_SSR_SECRET!),
    },
  });

  return res.data['access_token'];
};
