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
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>cookie</span>
              {t('badge')}
            </div>
            <h1 className={styles.title}>{t('mainTitle')}</h1>
            <p className={styles.lastUpdated}>{t('lastUpdated')}</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.what.title')}</h2>
              <p className={styles.bodyText}>{t('sections.what.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.how.title')}</h2>
              <p className={styles.bodyText}>{t('sections.how.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.types.title')}</h2>
              <p className={styles.bodyText}>{t('sections.types.body')}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('sections.choice.title')}</h2>
              <p className={styles.bodyText}>{t('sections.choice.body')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
