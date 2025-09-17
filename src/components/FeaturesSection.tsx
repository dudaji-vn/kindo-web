import Image from 'next/image';
import Images from '@/assets/images';
import { Star } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="">
      {/* Gamified Learning */}
      <div className="w-full bg-neutral-100 px-5 py-10 sm:px-10 md:px-[5vw] md:py-14 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <div className="mb-4 flex items-center">
              <Star className="text-primary mr-3" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                Key Feature
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              Gamified Learning
            </h2>
            <p className="text-lg text-gray-600">
              Kindo transforms language acquisition into an engaging experience
              with interactive question-and-answer formats, giving learners the
              flexibility to focus on specific topics of interest.
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
      <div className="w-full px-5 py-10 sm:px-10 md:px-[5vw] md:py-14 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <Image
                src={Images.homepage.extensiveLessonLibrary}
                alt="Extensive Lesson Library"
                objectFit="cover"
                className="top-0 w-full"
                quality={100}
              />
            </div>
            <div>
              <div className="mb-4 flex items-center">
                <Star className="text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Key Feature
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                Extensive Lesson Library
              </h2>
              <p className="text-lg text-gray-600">
                The platform provides over 150 lessons in basic, intermediate,
                organized into three distinct levels, with approximately 50
                lessons per level. This structured curriculum is designed to
                help learners achieve fluency.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Incentive Badges */}
      <>
        <div className="w-full bg-neutral-100 px-5 py-10 sm:px-10 md:px-[5vw] md:py-14 lg:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12">
            <div className="order-2 lg:order-1">
              <div className="mb-4 flex items-center">
                <Star className="text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Key Feature
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
                Incentive Badges
              </h2>
              <p className="text-lg text-gray-600">
                Learners are motivated through a visually appealing badge
                system. These badges can be collected and shared with friends,
                fostering a sense of accomplishment and community.
              </p>
            </div>
            <div className="order-1 lg:order-2">
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <div className="mb-4 flex items-center">
              <Star className="text-primary mr-3" />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                Key Feature
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              AI-Powered Practice
            </h2>
            <p className="text-lg text-gray-600">
              The chatbot offers personalized conversations, covering all four
              language skills: listening, reading, writing, and speaking. Each
              session is followed by a detailed performance review to guide
              specific improvement.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <Image
                src={Images.homepage.aiPoweredPractice}
                alt="AI-Powered Practice"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
