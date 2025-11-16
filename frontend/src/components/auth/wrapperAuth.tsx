'use client';

import { Sparkles } from 'lucide-react';
import type * as React from 'react';

import { Logo } from '../logo/Logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export interface IWrapperAuthProps {
  title: string;
  children: React.ReactNode;
}

export function WrapperAuth({ title, children }: IWrapperAuthProps): React.JSX.Element {
  return (
    <Card className="w-full max-w-md relative border-0 shadow-2xl backdrop-blur-sm bg-white/80">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <CardHeader className="justify-items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-75 animate-pulse blur-xl"></div>
          <Logo width={40} height={40}></Logo>
        </div>
        <div className="text-center">
          <CardTitle className="text-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            FinTracker
            <Sparkles className="w-6 h-6 text-purple-500" />
          </CardTitle>
          <CardDescription className="mt-2">{title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
