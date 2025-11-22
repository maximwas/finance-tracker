import * as motion from 'motion/react-client';
import { type JSX } from 'react';

import { type DefaultUIProps } from '@/types/default-props.type';
import { cn } from '@/utils/cn';

export interface IBubbleProps extends DefaultUIProps {
  animationDelay?: number;
}

export function Bubble({ className, animationDelay }: IBubbleProps): JSX.Element {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        delay: animationDelay,
      }}
      className={cn(
        'absolute rounded-full mix-blend-multiply filter blur-xl opacity-20',
        className,
      )}
    ></motion.div>
  );
}
