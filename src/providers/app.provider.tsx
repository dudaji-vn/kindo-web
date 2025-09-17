'use client';

import Navbar from '@/components/Navbar/Navbar';
import i18next from '@/lib/i18n/config';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ReactQueryProvider } from './react-query.provider';

export const AppProvider = (props: React.PropsWithChildren) => {
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
        <Navbar />
        {props.children}
      </I18nextProvider>
    </ReactQueryProvider>
  );
};
