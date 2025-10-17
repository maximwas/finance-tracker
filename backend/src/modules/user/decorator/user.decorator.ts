import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type User } from '@prisma/client';
import { type Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user: User = request.user;

    return data ? user?.[data] : user;
  },
);
