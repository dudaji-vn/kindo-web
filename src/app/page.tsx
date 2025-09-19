import FeaturesSection from '@/components/FeaturesSection';
import FooterSection from '@/components/FooterSection';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="h-full">
      <main>
        <HeroSection />
        <FeaturesSection />
        <FooterSection />
      </main>
    </div>
  );
}
