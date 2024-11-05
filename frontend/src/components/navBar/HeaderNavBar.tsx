// components/HeaderNavbar.tsx
'use client'; // This file will use hooks

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderNavbar = () => {
  const t = useTranslations('NavBar');

  const pathname = usePathname();

  const isActive = (path: string) => (pathname === path ? 'font-bold' : '');

  return (
    <header className="hidden md:flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">My SPA</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" className={isActive('/login')}>
              {t('login')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
