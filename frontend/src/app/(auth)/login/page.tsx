import { Wallet } from 'lucide-react';
import { type JSX } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { LoginForm } from './LoginForm';

export default async function Login(): Promise<JSX.Element> {
  return (
    <Card className="w-full max-w-md relative border-0 shadow-2xl backdrop-blur-sm bg-white/80">
      <CardHeader className="">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
          <div className="relative w-20 h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <Wallet className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="text-center">
          <CardTitle>FinTracker</CardTitle>
          <CardDescription>Sign in to your financial world</CardDescription>
        </div>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
