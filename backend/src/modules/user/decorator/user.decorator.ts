import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { type User } from '@prisma/client';
import { type Request } from 'express';
import { type GqlContext } from 'src/types/context';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user: User = request.user;

    return data ? user?.[data] : user;
  },
);

export const GqlCurrentUser = createParamDecorator(
  (data: keyof User | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<GqlContext>().req;

    return data ? request.user?.[data] : request.user;
  },
);
