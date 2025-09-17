import Image from 'next/image';
import Images from '@/assets/images';
import SVGs from '@/assets/SVG';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { KINDO_APP_STORE_URL, KINDO_GOOGLE_STORE_URL } from '@/constant';

export default function HeroSection() {
  return (
    <>
      <section className="relative mx-5 mt-[84px] flex max-w-7xl flex-1 justify-center max-md:h-[calc(100dvh-104px)] sm:mx-10 md:mx-[5vw] md:min-h-1/2">
        {/* min-h-[calc(100dvh-64px)] */}
        {/* Download card */}

        <div className="relative flex h-full w-full">
          <div className="z-10 flex w-full px-5 py-5 md:min-w-1/2 md:justify-center md:py-10 lg:px-10">
            <div className="flex w-full flex-col justify-end gap-3 md:justify-center">
              <h1 className="mb-6 text-3xl font-semibold text-neutral-800 sm:text-5xl lg:text-6xl">
                Learning as{' '}
                <span className="text-primary block text-7xl">PLAYING</span>
              </h1>
              {/* Download buttons */}
              <div className="flex flex-col gap-3 md:justify-center">
                <span>Download now at</span>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href={
                      KINDO_APP_STORE_URL ||
                      'https://apps.apple.com/vn/app/kindo-learning-korean/'
                    }
                    target="_blank"
                    className="inline-flex items-center justify-center gap-3 rounded-lg bg-black px-4 py-1 text-white transition-colors hover:bg-gray-800 hover:shadow-md"
                  >
                    <div className="text-2xl"></div>
                    <div className="min-w-fit truncate text-sm">
                      Download on the <p className="text-2xl">App Store</p>
                    </div>
                  </Link>
                  <Link
                    href={
                      KINDO_GOOGLE_STORE_URL ||
                      'https://play.google.com/store/apps/details?id=com.dudaji.kindo'
                    }
                    target="_blank"
                    className="bg-background text-foreground inline-flex items-center justify-center gap-3 rounded-lg border px-4 py-1 transition-colors hover:shadow-md"
                  >
                    <Image
                      src={SVGs.play}
                      alt="Google Play"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <div className="min-w-fit truncate text-sm">
                      Get it on <p className="text-2xl">Google Play</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 h-full w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={Images.homepage.mobileLanding}
              alt="Kindo Mobile App"
              fill
              objectFit="cover"
              className="md:hidden"
            />
            <Image
              src={Images.homepage.pcLanding}
              alt="Kindo Mobile App"
              fill
              className="max-md:hidden"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
      <section className="relative grid px-5 pt-5 sm:px-10 md:px-10">
        {/* Features list */}
        <div className="flex min-h-1/2 flex-col items-center justify-center gap-5 py-10 md:flex-1">
          <p className="text-primary text-xl">
            Kindo is a mobile application designed to help users learn the
            Korean language through engaging, gamified lessons.
          </p>{' '}
          <p className="text-lg font-semibold text-neutral-800">
            What sets us apart in the market:{' '}
          </p>
          <div className="grid w-fit gap-5">
            <div className="flex flex-col items-start gap-3 rounded-2xl bg-orange-50 p-4">
              <div className="flex flex-row gap-3">
                <Star className="text-primary" />
                <h3 className="text-primary font-semibold">
                  First-step Virtual Keyboard
                </h3>
              </div>
              <p className="text-sm text-neutral-800">
                We are the first app to feature a built-in Korean virtual
                keyboard, providing a seamless experience for users to practice
                writing.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 rounded-2xl bg-orange-50 p-4">
              <div className="flex flex-row gap-3">
                <Star className="text-primary" />
                <h3 className="text-primary font-semibold">A.I. Integration</h3>
              </div>
              <p className="text-sm text-neutral-800">
                Our use of A.I. personalized conversation practice and adapts to
                each user&apos;s level, enhancing the learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
