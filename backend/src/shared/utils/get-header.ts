export function getHeader<T = string>(
  headers: Record<string, string | string[] | undefined>,
  key: string,
): T | null {
  const value = headers[key];

  if (!value) return null;

  return value as unknown as T;
}
