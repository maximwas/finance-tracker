import axios from 'axios';

import { type IUserName } from './utils';
import { type SignUpFormValues } from './validations/sign-up-schema';
import { type SingInFormValues } from './validations/sing-in-schema';

export interface ApiResponse<T = unknown> {
  data?: T;
  message: string;
  success: boolean;
  timestamp: string;
  requestId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/auth`,
  withCredentials: true,
});

export const getUser = async (cookie?: string): Promise<ApiResponse<User>> => {
  if (cookie) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cookie,
      },
    });

    const data = await response.json();

    return data;
  }

  const response = await authClient.get<ApiResponse<User>>('/me');

  return response.data;
};

export const signUp = async (
  body: Omit<SignUpFormValues, 'name'> & IUserName,
): Promise<ApiResponse> => {
  const response = await authClient.post<ApiResponse>('/signup', body);

  return response.data;
};

export const signIn = async (body: SingInFormValues): Promise<ApiResponse> => {
  const response = await authClient.post<ApiResponse>('/login', body);

  return response.data;
};

export const logout = async (): Promise<ApiResponse> => {
  const response = await authClient.get<ApiResponse>('/logout');

  return response.data;
};
