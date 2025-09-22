'use client';
import { LanguageSelector } from '@/components/LanguageSelector';
import { DUDAJI_VN_CONTACT_URL, KINDO_DOCS_URL } from '@/constant';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

import { useTranslation } from 'react-i18next';

interface NavigationItem {
  key: string; // translation key suffix
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { key: 'ONLINE_LECTURES', href: '/lectures', current: false },
  { key: 'USER_GUIDE', href: KINDO_DOCS_URL || '#', current: false },
  { key: 'CONTACT_US', href: DUDAJI_VN_CONTACT_URL || '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  // language handled inside LanguageSelector via store
  const { t } = useTranslation('common');
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/80 px-6 shadow-sm backdrop-blur-md sm:px-10 md:px-[5vw]">
      <div className="mx-auto max-w-7xl py-3">
        <div className="relative flex h-10 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-between">
            {/* LOGO */}

            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  className="block h-12 w-40 lg:hidden"
                  src="/kindo-logo-light.svg"
                  alt="Kindo Logo"
                  width={160}
                  height={48}
                />
                <Image
                  className="hidden h-full w-full lg:block"
                  src="/kindo-logo-light.svg"
                  alt="Kindo Logo"
                  width={200}
                  height={60}
                />
              </Link>
            </div>

            {/* LINKS */}
            <div className="ml-20 hidden items-center gap-6 lg:flex">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'text-primary-500 hover:text-primary-800'
                        : 'hover:text-primary-500 text-neutral-800',
                      'px-3 py-4 font-semibold transition-colors duration-200',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {t(`NAVBAR.${item.key}`)}
                  </Link>
                ))}
              </div>
              <LanguageSelector />
            </div>
          </div>
          <Drawer direction="left">
            <DrawerTrigger>
              <Menu
                className="block h-6 w-6 cursor-pointer text-gray-700 transition-colors hover:text-orange-500 lg:hidden"
                aria-hidden="true"
              />
            </DrawerTrigger>
            <DrawerContent>
              {/* <Drawerdata /> */}
              <div className="border-b border-white/20 bg-white/80 px-6 shadow-sm backdrop-blur-md sm:px-10 md:px-[5vw]">
                <div className="flex flex-1 items-center py-2 sm:items-stretch sm:justify-between">
                  {/* LOGO */}

                  <div className="flex flex-shrink-0 items-center">
                    <DrawerClose asChild>
                      <Link href="/">
                        <Image
                          className="block h-12 w-40 lg:hidden"
                          src="/kindo-logo-light.svg"
                          alt="Kindo Logo"
                          width={160}
                          height={48}
                        />
                        <Image
                          className="hidden h-full w-full lg:block"
                          src="/kindo-logo-light.svg"
                          alt="Kindo Logo"
                          width={200}
                          height={60}
                        />
                      </Link>
                    </DrawerClose>
                  </div>
                </div>
              </div>
              <DrawerHeader>
                <DrawerTitle className="px-3">
                  {t('NAVBAR.DRAWER_TITLE')}
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex h-full flex-col gap-10 pt-0 pb-5">
                <div className="grid gap-3 px-5">
                  {navigation.map((item, index) => (
                    <DrawerClose asChild key={index}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'text-black hover:opacity-100'
                            : 'hover:text-black hover:opacity-100',
                          'block px-2 py-1 text-lg font-normal opacity-75',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {t(`NAVBAR.${item.key}`)}
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
                <div className="flex w-full justify-center">
                  <LanguageSelector />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
