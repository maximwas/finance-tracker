import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_JWT_SECRET!;

export function isTokenValid(token?: string): boolean {
  if (!token) return false;

  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch {
    return false;
  }
}
