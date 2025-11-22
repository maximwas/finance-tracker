import { type ApiResponse } from '@/types/api';
import { type IUserName } from '@/utils/name';

import { axiosClient } from './axios-client';
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
