import { enc, HmacSHA256 } from 'crypto-js';

export const hash = (data: string, secret: string): string => {
  return HmacSHA256(data, secret).toString(enc.Hex);
};
