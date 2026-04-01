import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HeroSection/HeroSection';
import ServicesSection from '@/components/ServicesSection/ServicesSection';
import StatsSection from '@/components/StatsSection/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection/TestimonialsSection';
import CTASection from '@/components/CTASection/CTASection';
import Footer from '@/components/Footer/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'enterprise software', 'AI solutions', 'cloud infrastructure',
      'SaaS engineering', 'digital transformation', 'Turkey', 'Softium',
      'yazılım geliştirme', 'yapay zeka', 'bulut çözümleri',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection locale={locale} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
