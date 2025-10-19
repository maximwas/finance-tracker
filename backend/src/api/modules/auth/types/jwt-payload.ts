import { type User } from '@prisma/client';

export type JWTPayload = Pick<User, 'id' | 'email'>;
