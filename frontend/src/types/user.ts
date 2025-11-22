import { type Mode } from './auth';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IGetUserOptions {
  mode: Mode;
  cookie?: string;
}
