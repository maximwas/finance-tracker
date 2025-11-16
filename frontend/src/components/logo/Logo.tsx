import { Wallet } from 'lucide-react';
import * as React from 'react';

export interface ILogoProps {
  width: number;
  height: number;
}

function Logo({ width, height }: ILogoProps): React.JSX.Element {
  return (
    <div
      className="relative bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
      style={{
        width: width * 2,
        height: height * 2,
      }}
    >
      <Wallet
        className="text-white"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
}

export { Logo };
