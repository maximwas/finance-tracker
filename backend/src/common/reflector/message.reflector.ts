import { type CustomDecorator, SetMetadata } from '@nestjs/common';
export const MESSAGE_META_KEY = 'message';
export const Message = (message: string): CustomDecorator<string> =>
  SetMetadata(MESSAGE_META_KEY, message);
