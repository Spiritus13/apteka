'use client';

import { useRouter } from 'next/navigation';
import { removeToken } from '../lib/auth';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
