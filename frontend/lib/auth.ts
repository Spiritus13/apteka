export function getToken() {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    if (match) {
      return match[2];
    }
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    document.cookie = `token=${token}; path=/;`;
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; path=/; max-age=0;';
  }
}
