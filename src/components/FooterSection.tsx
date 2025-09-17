import SVGs from '@/assets/SVG';
import {
  DUDAJI_CONTACT_MAIL,
  DUDAJI_VN_URL,
  KINDO_APP_STORE_URL,
  KINDO_GOOGLE_STORE_URL,
} from '@/constant';
import { ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <>
      {/* Call to Action Section */}
      <section
        className="relative py-16"
        style={{
          backgroundImage: `url(${SVGs.shadow.src}), linear-gradient(to top, #FFF8F1, #FEEEDA)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional stronger gradient overlay (uncomment if needed) */}
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FFF8F1]/90 to-[#FEEEDA]/60" /> */}
        <div className="mx-auto grid max-w-4xl justify-center px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-neutral-800 lg:text-4xl">
            Ready to get start?
          </h2>
          <p className="mb-8 text-lg text-neutral-800">Download App Now</p>

          {/* Download buttons */}
          <div className="flex flex-row gap-3">
            <Link
              href={
                KINDO_APP_STORE_URL ||
                'https://apps.apple.com/vn/app/kindo-learning-korean/'
              }
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-lg bg-black px-4 py-1 text-white transition-colors hover:bg-gray-800 hover:shadow-md"
            >
              <div className="text-2xl"></div>
              <div className="min-w-fit truncate text-left text-sm">
                Download on the <p className="text-2xl">App Store</p>
              </div>
            </Link>
            <Link
              href={
                KINDO_GOOGLE_STORE_URL ||
                'https://play.google.com/store/apps/details?id=com.dudaji.kindo'
              }
              className="text-foreground inline-flex flex-1 items-center justify-center gap-3 rounded-lg border bg-white px-4 py-1 transition-colors hover:shadow-md"
            >
              <Image
                src={SVGs.play}
                alt="Google Play"
                width={20}
                height={20}
                className="mr-2"
              />
              <div className="min-w-fit truncate text-left text-sm">
                Get it on <p className="text-2xl">Google Play</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Company Info */}
            <div className="mb-8 flex flex-col items-center justify-center text-neutral-800">
              <div className="mb-4 flex w-fit items-center">
                <Star className="text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  About us
                </span>
              </div>

              <Link
                href={DUDAJI_VN_URL || 'https://dudaji.vn/'}
                target="_blank"
                className="mb-4 flex items-center gap-2 hover:underline"
              >
                <h3 className="text-2xl font-bold">DUDAJI VIETNAM</h3>
                <ExternalLink />
              </Link>
              <p className="mx-auto max-w-3xl leading-relaxed">
                Dudaji supports you to quickly build a deep learning utilization
                service in a timely and timely place.
              </p>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed">
                To put machine learning and deep learning techniques into
                practice, you can not only design algorithms, but also there is
                a great need for infrastructure know-how, such as data
                preprocessing, building a distributed development environment,
                resource management, and process management.Based on the
                experience of conducting various AI projects, Dudaji accelerates
                the implementation of related data and ideas as a service
                quickly.
              </p>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                Dudaji, Inc © All Rights Reserved.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <a
                  href={`mailto:${DUDAJI_CONTACT_MAIL || 'contact@dudaji.vn'}`}
                  className="hover:text-primary-500 transition-colors"
                >
                  contact@dudaji.vn
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
