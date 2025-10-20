export enum AuthPayloadProp {
  RefreshToken = 'refresh_token',
  AccessToken = 'access_token',
}

export interface AuthPayload {
  [AuthPayloadProp.RefreshToken]: string;
  [AuthPayloadProp.AccessToken]: string;
}

export interface IRefreshTokenOptions {
  isSSR: boolean;
  times: string | null;
  signature: string | null;
}
