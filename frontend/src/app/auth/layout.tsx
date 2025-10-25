import { type JSX } from 'react';

import { Bubble } from '@/components/ui/Bubble';

export interface IAuthLayout {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayout): JSX.Element {
  return (
    <div id="auth">
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Bubble className="-top-40 -right-40 w-80 h-80 bg-purple-400"></Bubble>
          <Bubble className="-bottom-40 -left-40 w-80 h-80 bg-blue-400" animationDelay={1}></Bubble>
          <Bubble
            className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400"
            animationDelay={2}
          ></Bubble>
        </div>
        {children}
      </div>
    </div>
  );
}
