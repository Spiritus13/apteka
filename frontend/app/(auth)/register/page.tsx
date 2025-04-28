// app/register/page.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/register', { email, password });
      setToken(data.token);
      router.push('/');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
