import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

declare module 'express' {
  interface Request {
    cookies: Record<string, string>;
  }
}
