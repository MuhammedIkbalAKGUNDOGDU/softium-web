import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import styles from './contact.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}${locale === 'tr' ? '/iletisim' : '/contact'}`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            'name': 'Softium Contact',
            'description': t('subtitle'),
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '+90 212 123 45 67',
              'contactType': 'customer service',
              'email': 'hello@softium.tech'
            }
          })
        }}
      />
      <Navbar />
      <main id="main-content" className={styles.main}>
        {/* Decorative background */}
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.gridPattern} />
        </div>

        <div className="container">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
