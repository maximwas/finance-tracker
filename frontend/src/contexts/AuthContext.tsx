'use client';

import { useRequest } from 'ahooks';
import { createContext, type JSX, useContext } from 'react';

import {
  type AuthResponse,
  getUser,
  logout as logoutAuth,
  signIn as signInAuth,
  signUp as signUpAuth,
  type User,
} from '@/lib/auth';
import { type SignUpFormValues } from '@/lib/validations/sign-up-schema';
import { type SingInFormValues } from '@/lib/validations/sing-in-schema';
import { type DefaultUIProps } from '@/types/default-props.type';

export interface IAuthContextProps {
  user?: User;
  signUp: (body: SignUpFormValues) => Promise<AuthResponse>;
  signIn: (body: SingInFormValues) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export function AuthProvider({ children }: DefaultUIProps): JSX.Element {
  const { data, refresh } = useRequest(getUser);

  const signUp = async (body: SignUpFormValues): Promise<AuthResponse> => {
    const res = await signUpAuth(body);
    refresh();
    return res;
  };

  const signIn = async (body: SingInFormValues): Promise<AuthResponse> => {
    const res = await signInAuth(body);
    refresh();
    return res;
  };

  const logout = async (): Promise<AuthResponse> => {
    const res = await logoutAuth();
    refresh();
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuthContextProps => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
};
