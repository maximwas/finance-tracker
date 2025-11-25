import { axiosClient } from '@/lib/axios-client';
import { axiosServer } from '@/lib/axios-server';
import { axiosSSR } from '@/lib/axios-ssr';
import { type RefreshAccessTokenOptions } from '@/types/auth';

import {
  HEADER_AVAILABLE_DATA,
  HEADER_REQUEST_SSR,
  HEADER_SIGNATURE_SSR,
  HEADER_TIMES_SSR,
} from '../../../../shared/constants';
import { type AuthPayload, AuthPayloadProp } from '../../../../shared/src/types/token.type';
import { hash } from '../../../../shared/utils/hash';

const createSSRHeaders = (refreshToken: string): Record<string, string> => {
  const times = Date.now().toString();
  const secret = process.env.NEXT_SSR_SECRET!;

  return {
    [HEADER_REQUEST_SSR]: 'true',
    [HEADER_AVAILABLE_DATA]: 'true',
    [HEADER_TIMES_SSR]: times,
    [HEADER_SIGNATURE_SSR]: hash(`${refreshToken}.${times}`, secret),
  };
};

export function refreshAccessToken(options: { mode: 'ssr'; refreshToken: string }): Promise<string>;
export function refreshAccessToken(options: { mode: 'server' }): Promise<AuthPayload>;
export function refreshAccessToken(options: { mode: 'client' }): Promise<void>;
export async function refreshAccessToken({
  mode,
  refreshToken,
}: RefreshAccessTokenOptions): Promise<string | AuthPayload | void> {
  switch (mode) {
    case 'ssr': {
      if (!refreshToken) throw new Error('refreshToken is required for SSR');

      const headers = createSSRHeaders(refreshToken);
      const res = await axiosSSR.get<AuthPayload>('/auth/refresh', { headers });

      return res.data[AuthPayloadProp.AccessToken];
    }

    case 'server': {
      const res = await axiosServer.get<AuthPayload>('/auth/refresh', {
        headers: {
          [HEADER_AVAILABLE_DATA]: 'true',
        },
      });
      return res.data;
    }

    case 'client': {
      await axiosClient.get<null>('/auth/refresh');
      return;
    }

    default:
      throw new Error('Unknown mode');
  }
}
