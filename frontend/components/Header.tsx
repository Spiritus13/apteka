'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { removeToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    removeToken();
    toast.success('Wylogowano pomyślnie.');
    router.push('/login');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Wpisz nazwę leku.');
      return;
    }
    const normalizedSearch = encodeURIComponent(searchTerm.trim());
    router.push(`/drug/${normalizedSearch}`);
    setSearchTerm('');
  };

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="font-bold text-lg">MojaApteka</span>
          </Link>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Szukaj leków..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <Button type="submit" variant="outline" size="icon">
              🔍
            </Button>
          </form>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/orders">
                  Zamówienia
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="outline" onClick={handleLogout}>
                Wyloguj
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
