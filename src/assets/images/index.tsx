import { StaticImageData } from 'next/image';
import mobileLanding from './homepage/mobile-landing.png';
import pcLanding from './homepage/pc-landing.png';
import aiPoweredPractice from './homepage/AI-powered-practice.png';
import incentiveBadges from './homepage/incentive-badges.png';
import gamifiedLearning from './homepage/gamified-learning.png';
import extensiveLessonLibrary from './homepage/extensive-lesson-library.png';

interface ImageCollection {
  homepage: {
    mobileLanding: StaticImageData;
    pcLanding: StaticImageData;
    aiPoweredPractice: StaticImageData;
    incentiveBadges: StaticImageData;
    gamifiedLearning: StaticImageData;
    extensiveLessonLibrary: StaticImageData;
  };
  public: {
    kindoLogoLight: string;
    landing: string;
    file: string;
    globe: string;
    next: string;
    vercel: string;
    window: string;
  };
}

const Images: ImageCollection = {
  homepage: {
    mobileLanding,
    pcLanding,
    aiPoweredPractice,
    incentiveBadges,
    gamifiedLearning,
    extensiveLessonLibrary,
  },
  public: {
    kindoLogoLight: '/kindo-logo-light.svg',
    landing: '/landing.png',
    file: '/file.svg',
    globe: '/globe.svg',
    next: '/next.svg',
    vercel: '/vercel.svg',
    window: '/window.svg',
  },
};

export default Images;
