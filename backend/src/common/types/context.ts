import { type Request, type Response } from 'express';

export interface GqlContext {
  req: Request;
  res: Response;
}
