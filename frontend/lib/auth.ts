// lib/auth.ts
import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}
export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, { path: '/' });
}
export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
