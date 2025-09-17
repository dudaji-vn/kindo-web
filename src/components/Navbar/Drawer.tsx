import { XIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <main
      className={
        'fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out ' +
        (isOpen
          ? ' translate-x-0 opacity-100 transition-opacity duration-500'
          : ' -translate-x-full opacity-0 transition-all delay-500')
      }
    >
      <section
        className={
          'w-270px delay-400 absolute left-0 h-full max-w-lg transform bg-white/95 shadow-xl backdrop-blur-md transition-all duration-500 ease-in-out ' +
          (isOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <article className="w-270 relative flex h-full max-w-lg flex-col space-y-6 pb-10">
          <header className="flex items-center justify-between p-4">
            <Image
              className="h-12 w-40"
              src="/kindo-logo-light.svg"
              alt="Kindo Logo"
              width={160}
              height={48}
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <XIcon
              className="block h-6 w-6"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </header>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {children}
          </div>
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
