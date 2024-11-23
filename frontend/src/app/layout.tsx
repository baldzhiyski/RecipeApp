import BottomNavbar from '@components/navBar/BottomNavBar';
import HeaderNavbar from '@components/navBar/HeaderNavBar';
import { NextIntlClientProvider } from 'next-intl';
import { Roboto } from 'next/font/google';
import Footer from '@components/Footer';

import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { Metadata } from 'next';
import { NextUIProvider } from '@nextui-org/react';

const APP_NAME = 'PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

const robot = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Define metadata
export const metadata: Metadata = {
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
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

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`overflow-auto select-none ${robot.className}`}>
        <NextUIProvider>
          <NextIntlClientProvider messages={messages}>
            <HeaderNavbar />
            {/* Main Content Area */}
            <main >{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
};

export default Layout;
