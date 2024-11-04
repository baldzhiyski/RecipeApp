import BottomNavbar from '@components/navBar/BottomNavBar';
import HeaderNavbar from '@components/navBar/HeaderNavBar';
import { NextIntlClientProvider } from 'next-intl';

import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col h-screen">
        <NextIntlClientProvider messages={messages}>
          <HeaderNavbar />

          {/* Main Content Area */}
          <main className="flex-1 p-5">{children}</main>

          <BottomNavbar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
