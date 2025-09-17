import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FooterSection from '@/components/FooterSection';

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
