import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './legal.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>gavel</span>
              {t('badge')}
            </div>
            <h1 className={styles.title}>{t('mainTitle')}</h1>
            <p className={styles.lastUpdated}>{t('lastUpdated')}</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.general.title')}</h2>
              <p className={styles.bodyText}>{t('sections.general.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.ip.title')}</h2>
              <p className={styles.bodyText}>{t('sections.ip.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.disclaimer.title')}</h2>
              <p className={styles.bodyText}>{t('sections.disclaimer.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.limitation.title')}</h2>
              <p className={styles.bodyText}>{t('sections.limitation.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.governing.title')}</h2>
              <p className={styles.bodyText}>{t('sections.governing.body')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
