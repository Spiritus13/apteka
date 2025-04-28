'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  async function handleRegister() {
    try {
      await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      router.push('/login');
    } catch (e) {
      alert('Rejestracja nie powiodła się: ' + e.message);
    }
  }

  return (
    <div className='p-6 flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Rejestracja</h1>
      <input
        className='border p-2 rounded'
        placeholder='Imię'
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className='border p-2 rounded'
        placeholder='Nazwisko'
        onChange={(e) => setForm({ ...form, surname: e.target.value })}
      />
      <input
        className='border p-2 rounded'
        type='email'
        placeholder='Email'
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className='border p-2 rounded'
        type='password'
        placeholder='Hasło'
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className='bg-blue-600 text-white p-2 rounded'
        onClick={handleRegister}
      >
        Zarejestruj się
      </button>
    </div>
  );
}
