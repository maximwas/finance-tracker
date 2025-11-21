'use client';

import { useRequest } from 'ahooks';
import { createContext, type JSX, useContext, useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';
import {
  type ApiResponse,
  getUser,
  logout as logoutAuth,
  signIn as signInAuth,
  signUp as signUpAuth,
  type User,
} from '@/lib/auth';
import { type IUserName } from '@/lib/utils';
import { type SignUpFormValues } from '@/lib/validations/sign-up-schema';
import { type SingInFormValues } from '@/lib/validations/sing-in-schema';
import { type DefaultUIProps } from '@/types/default-props.type';

export interface IAuthContextProps {
  user?: User;
  signUp: (body: Omit<SignUpFormValues, 'name'> & IUserName) => Promise<ApiResponse>;
  signIn: (body: SingInFormValues) => Promise<ApiResponse>;
  logout: () => Promise<ApiResponse>;
}

const AuthContext = createContext<IAuthContextProps | null>(null);

export function AuthLoader(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-6 text-primary" />
    </div>
  );
}

export function AuthProvider({ children }: DefaultUIProps): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { data, loading, refresh, error } = useRequest(getUser);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    } else if (error) {
      setUser(undefined);
    }
  }, [data, error]);

  const signUp = async (body: Omit<SignUpFormValues, 'name'> & IUserName): Promise<ApiResponse> => {
    const response = await signUpAuth(body);

    if (response.success) refresh();

    return response;
  };

  const signIn = async (body: SingInFormValues): Promise<ApiResponse> => {
    const response = await signInAuth(body);

    if (response.success) refresh();

    return response;
  };

  const logout = async (): Promise<ApiResponse> => {
    const response = await logoutAuth();

    if (response.success) refresh();

    return response;
  };

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
