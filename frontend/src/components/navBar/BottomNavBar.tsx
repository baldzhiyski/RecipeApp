// components/BottomNavbar.tsx
'use client'; // This file will also use hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BottomNavbar = () => {
  const t = useTranslations('NavBar');
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? 'font-bold' : '');

  return (
    <nav className="md:hidden bg-gray-800 text-white">
      <ul className="flex justify-around p-2">
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
  );
};

export default BottomNavbar;
