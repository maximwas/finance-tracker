import axios from 'axios';

import { type SignUpFormValues } from './validations/sign-up-schema';
import { type SingInFormValues } from './validations/sing-in-schema';

export interface AuthResponse {
  message: string;
}

export interface User {
  id: string;
  fistName: string;
  lastName: string;
}

const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
  withCredentials: true,
});

export const getUser = async (isSSR: boolean = false): Promise<User> => {
  if (isSSR) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    return data;
  }

  const response = await authClient.get<User>('/me');

  return response.data;
};

export const signUp = async (body: SignUpFormValues): Promise<AuthResponse> => {
  const response = await authClient.post<AuthResponse>('/signup', body);

  return response.data;
};

export const signIn = async (body: SingInFormValues): Promise<AuthResponse> => {
  const response = await authClient.post<AuthResponse>('/login', body);

  return response.data;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await authClient.post<AuthResponse>('/logout');

  return response.data;
};
