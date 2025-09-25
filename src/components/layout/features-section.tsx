'use client';
import Image from 'next/image';
import Images from '@/assets/images';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection() {
  const { t } = useTranslation('common');
  return (
    <section className="">
      {/* Gamified Learning */}
      <div className="w-full bg-neutral-100 px-5 py-10 sm:px-10 md:px-[5vw] md:py-14 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="order-2 md:order-1">
            <div className="mb-4 flex items-center">
              <Star className="text-primary mr-3" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                {t('HOMEPAGE.FEATURES.label')}
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {t('HOMEPAGE.FEATURES.gamified.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('HOMEPAGE.FEATURES.gamified.description')}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <Image
                src={Images.homepage.gamifiedLearning}
                alt="Gamified Learning Feature"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Extensive Lesson Library */}
      <div className="w-full px-5 pt-10 sm:px-10 md:px-[5vw] md:pt-14 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mt-auto aspect-[5/4] w-full overflow-hidden">
              <Image
                src={Images.homepage.extensiveLessonLibrary}
                alt="Extensive Lesson Library"
                objectFit="cover"
                className="bottom-0 w-full"
                quality={100}
              />
            </div>
            <div className="pb-10 md:pb-14 lg:pb-24">
              <div className="mb-4 flex items-center">
                <Star className="text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {t('HOMEPAGE.FEATURES.label')}
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                {t('HOMEPAGE.FEATURES.lessonLibrary.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('HOMEPAGE.FEATURES.lessonLibrary.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Incentive Badges */}
      <>
        <div className="w-full bg-neutral-100 px-5 pt-10 sm:px-10 md:px-[5vw] md:pt-14 lg:pt-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="order-2 pb-10 md:order-1 md:pb-14 lg:pb-24">
              <div className="mb-4 flex items-center">
                <Star className="text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {t('HOMEPAGE.FEATURES.label')}
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                {t('HOMEPAGE.FEATURES.badges.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('HOMEPAGE.FEATURES.badges.description')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <Image
                  src={Images.homepage.incentiveBadges}
                  alt="Incentive Badges System"
                  objectFit="cover"
                  className="top-0 w-full"
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </>
      {/* AI-Powered Practice */}
      <div className="w-full px-5 py-10 sm:px-10 md:px-[5vw] md:py-14 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="order-1 sm:order-2">
            <div className="relative">
              <Image
                src={Images.homepage.aiPoweredPractice}
                alt="AI-Powered Practice"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="order-1 sm:order-2">
            <div className="mb-4 flex items-center">
              <Star className="text-primary mr-3" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                {t('HOMEPAGE.FEATURES.label')}
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {t('HOMEPAGE.FEATURES.aiPractice.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('HOMEPAGE.FEATURES.aiPractice.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
