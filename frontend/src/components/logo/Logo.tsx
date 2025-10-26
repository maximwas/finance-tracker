import { Wallet } from 'lucide-react';
import * as React from 'react';

export interface ILogoProps {
  width: number;
  height: number;
}

function Logo(): React.JSX.Element {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
      <div className="relative w-20 h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
        <Wallet className="w-10 h-10 text-white" />
      </div>
    </div>
  );
}

export { Logo };
