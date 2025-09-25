import Header from '@/components/layout/header';
import HeroSection from '@/components/layout/hero-section';
import FeaturesSection from '@/components/layout/features-section';
import FooterSection from '@/components/layout/footer-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FooterSection />
      </main>
    </div>
  );
}
