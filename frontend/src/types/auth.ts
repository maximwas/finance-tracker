export type Mode = 'client' | 'server' | 'ssr';

export interface RefreshAccessTokenOptions {
  mode: Mode;
  refreshToken?: string;
}
