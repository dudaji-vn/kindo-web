'use client';

import Navbar from '@/components/layout/nav-bar';
import i18next from '@/lib/i18n/config';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { ReactQueryProvider } from './react-query.provider';

export const AppProvider = (props: React.PropsWithChildren) => {
  const pathname = usePathname();
  const isBookPage = pathname?.startsWith('/book/');

  useEffect(() => {
    const isChromeBrowser = window.navigator.userAgent.includes('Chrome');
    if (isChromeBrowser) {
      document.body.classList.add('chrome');
    } else {
      document.body.classList.add('not-chrome');
    }
  }, []);

  return (
    <ReactQueryProvider>
      <I18nextProvider i18n={i18next}>
        {!isBookPage && <Navbar />}
        {props.children}
      </I18nextProvider>
    </ReactQueryProvider>
  );
};
