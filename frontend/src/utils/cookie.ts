export function getCookie(cookie: string, name: string): string | null {
  const matches = cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : null;
}
