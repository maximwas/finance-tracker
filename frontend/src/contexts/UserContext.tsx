'use client';

import { createContext, type JSX, useContext, useState } from 'react';

import { type User } from '@/lib/user';
import { type DefaultUIProps } from '@/types/default-props.type';

export interface IUserContextProps extends DefaultUIProps {
  initialUser: User | null;
}

export interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<IUserContext | null>(null);

export function UserProvider({ children, initialUser }: IUserContextProps): JSX.Element {
  const [user, setUser] = useState<User | null>(initialUser ?? null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = (): IUserContext => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }

  return ctx;
};
