import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/kindo-logo-light.svg"
                alt="Kindo Logo"
                width={80}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/lectures"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500"
            >
              Online Lectures
            </Link>
            <Link
              href="/guide"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500"
            >
              User Guide
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
