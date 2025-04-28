'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { saveToken } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      const { token } = await apiFetch<{ token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      saveToken(token);
      router.push('/dashboard');
    } catch (e) {
      alert('Logowanie nie powiodło się: ' + e.message);
    }
  }

  return (
    <div className='p-6 flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Logowanie</h1>
      <input
        className='border p-2 rounded'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='border p-2 rounded'
        type='password'
        placeholder='Hasło'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className='bg-green-600 text-white p-2 rounded'
        onClick={handleLogin}
      >
        Zaloguj się
      </button>
    </div>
  );
}
