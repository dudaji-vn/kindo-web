import FeaturesSection from '@/components/layout/features-section';
import FooterSection from '@/components/layout/footer-section';
import HeroSection from '@/components/layout/hero-section';

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
