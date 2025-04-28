// lib/auth.ts

export function getToken() {
  if (typeof window !== 'undefined') {
    // Dostęp do ciasteczek w przeglądarce
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    if (match) {
      return match[2]; // Zwróć wartość tokena
    }
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    // Ustawienie ciasteczka
    document.cookie = `token=${token}; path=/;`;
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    // Usunięcie ciasteczka
    document.cookie = 'token=; path=/; max-age=0;';
  }
}
