export const getCookie = (
  cookies: Record<string, string | undefined>,
  key: string,
): string | null => {
  return cookies[key] ?? null;
};
