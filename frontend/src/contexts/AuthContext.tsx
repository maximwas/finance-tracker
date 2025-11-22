'use client';

import { createContext, type JSX, useCallback, useContext } from 'react';

import { logout as logoutAuth, signIn as signInAuth, signUp as signUpAuth } from '@/lib/auth';
import { type User } from '@/lib/user';
import { type SignUpFormValues } from '@/lib/validations/sign-up-schema';
import { type SingInFormValues } from '@/lib/validations/sing-in-schema';
import { type ApiResponse } from '@/types/api';
import { type DefaultUIProps } from '@/types/default-props.type';
import { type IUserName } from '@/utils/name';

export interface IAuthContextProps {
  user?: User;
  signUp: (body: Omit<SignUpFormValues, 'name'> & IUserName) => Promise<ApiResponse>;
  signIn: (body: SingInFormValues) => Promise<ApiResponse>;
  logout: () => Promise<ApiResponse>;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export function AuthProvider({ children }: DefaultUIProps): JSX.Element {
  const signUp = useCallback(
    async (body: Omit<SignUpFormValues, 'name'> & IUserName): Promise<ApiResponse> => {
      const response = await signUpAuth(body);

      return response;
    },
    [],
  );

  const signIn = useCallback(async (body: SingInFormValues): Promise<ApiResponse> => {
    const response = await signInAuth(body);

    return response;
  }, []);

  const logout = useCallback(async (): Promise<ApiResponse> => {
    const response = await logoutAuth();

    return response;
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
