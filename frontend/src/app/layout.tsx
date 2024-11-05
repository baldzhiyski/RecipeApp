import BottomNavbar from '@components/navBar/BottomNavBar';
import HeaderNavbar from '@components/navBar/HeaderNavBar';
import { NextIntlClientProvider } from 'next-intl';

import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { Metadata, Viewport } from 'next';
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';

const APP_NAME = 'PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

// Define metadata
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </Head>
      <body className="h-screen">
        <NextUIProvider>
          <NextIntlClientProvider messages={messages}>
            <HeaderNavbar />
            {/* Main Content Area */}
            <main className="flex-1 p-5">{children}</main>
            <BottomNavbar />
          </NextIntlClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
};

export default Layout;
