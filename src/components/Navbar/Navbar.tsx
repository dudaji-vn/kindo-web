'use client';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Drawerdata from './Drawerdata';
import { DUDAJI_VN_CONTACT_URL, KINDO_DOCS_URL } from '@/constant';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Online Lectures', href: '/lectures', current: false },
  { name: 'User Guide', href: KINDO_DOCS_URL || '#', current: false },
  { name: 'Contact Us', href: DUDAJI_VN_CONTACT_URL || '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
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
            <div className="ml-20 hidden lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'text-primary-500 hover:text-primary-800'
                        : 'hover:text-primary-500 text-neutral-800',
                      'px-3 py-4 font-semibold transition-colors duration-200',
                    )}
                    aria-current={item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Drawer direction="top">
            <DrawerTrigger>
              <Menu
                className="block h-6 w-6 cursor-pointer text-gray-700 transition-colors hover:text-orange-500 lg:hidden"
                aria-hidden="true"
              />
            </DrawerTrigger>
            <DrawerContent className="">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                {/* <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription> */}
              </DrawerHeader>
              {/* <Drawerdata /> */}
              <div className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-white/80 px-6 shadow-sm backdrop-blur-md sm:px-10 md:px-[5vw]">
                <div className="flex flex-1 items-center py-3 sm:items-stretch sm:justify-between">
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

                  <DrawerClose>
                    <Menu
                      className="block h-6 w-6 cursor-pointer text-gray-700 transition-colors hover:text-orange-500"
                      aria-hidden="true"
                    />
                  </DrawerClose>
                </div>
              </div>
              <div className="space-y-1 px-5 pt-5 pb-5">
                {navigation.map((item, index) => (
                  <DrawerClose asChild key={index}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'text-black hover:opacity-100'
                          : 'hover:text-black hover:opacity-100',
                        'block px-2 py-1 text-center text-lg font-normal opacity-75',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </DrawerClose>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
