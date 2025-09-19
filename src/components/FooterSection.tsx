'use client';
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
import { useTranslation } from 'react-i18next';

export default function FooterSection() {
  const { t } = useTranslation('common');
  return (
    <>
      {/* Call to Action Section */}
      <section
        className="relative py-10 md:py-16"
        style={{
          backgroundImage: `url(${SVGs.shadow.src}), linear-gradient(to top, #FFF8F1, #FEEEDA)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional stronger gradient overlay (uncomment if needed) */}
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FFF8F1]/90 to-[#FEEEDA]/60" /> */}
        <div className="mx-auto flex max-w-2xl flex-col justify-center px-4 px-5 text-center sm:px-10 md:px-10">
          <h2 className="mb-6 text-3xl font-bold text-neutral-800 lg:text-4xl">
            {t('HOMEPAGE.CTA.title')}
          </h2>
          <p className="mb-8 text-lg text-neutral-800">
            {t('HOMEPAGE.CTA.subtitle')}
          </p>

          {/* Download buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={
                KINDO_APP_STORE_URL ||
                'https://apps.apple.com/vn/app/kindo-learning-korean/'
              }
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-lg bg-black px-4 py-1 text-white transition-colors hover:bg-gray-800 hover:shadow-md"
            >
              <div className="text-2xl"></div>
              <div className="min-w-fit truncate text-left text-sm">
                {t('HOMEPAGE.COMMON.downloadOnThe')}{' '}
                <p className="text-2xl">{t('HOMEPAGE.COMMON.appStore')}</p>
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
                {t('HOMEPAGE.COMMON.getItOn')}{' '}
                <p className="text-2xl">{t('HOMEPAGE.COMMON.googlePlay')}</p>
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
                  {t('HOMEPAGE.FOOTER.aboutLabel')}
                </span>
              </div>

              <Link
                href={DUDAJI_VN_URL || 'https://dudaji.vn/'}
                target="_blank"
                className="mb-4 flex items-center gap-2 hover:underline"
              >
                <h3 className="text-2xl font-bold">
                  {t('HOMEPAGE.FOOTER.companyName')}
                </h3>
                <ExternalLink />
              </Link>
              <p className="mx-auto max-w-3xl leading-relaxed">
                {t('HOMEPAGE.FOOTER.aboutParagraph1')}
              </p>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed">
                {t('HOMEPAGE.FOOTER.aboutParagraph2')}
              </p>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                {t('HOMEPAGE.FOOTER.copyright')}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <a
                  href={`mailto:${DUDAJI_CONTACT_MAIL || 'contact@dudaji.vn'}`}
                  className="hover:text-primary-500 transition-colors"
                >
                  {t('HOMEPAGE.FOOTER.contactEmail')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
