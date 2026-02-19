import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogClient from './BlogClient';
import styles from './blog.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        tr: '/tr/blog',
        en: '/en/blog',
        de: '/de/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ─────────────────────────────────── */}
        <section className={styles.heroSection} aria-labelledby="blog-hero-title">
          <div className="container">
            <div className={styles.heroGrid}>

              {/* Text col */}
              <div>
                <div className={styles.heroMeta}>
                  <span className={styles.featuredBadge}>{t('featuredLabel')}</span>
                  <span className={styles.heroDate}>{t('featuredDate')}</span>
                </div>

                <h1 className={styles.heroTitle} id="blog-hero-title">
                  {t('featuredTitle')}
                </h1>

                <p className={styles.heroSubtitle}>{t('featuredExcerpt')}</p>

                <div className={styles.heroCta}>
                  <Link
                    href={`/${locale}/blog/quantum-computing`}
                    className={styles.heroBtn}
                    id="blog-hero-read-btn"
                  >
                    {t('readInsight')}
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                      arrow_forward
                    </span>
                  </Link>

                  <div className={styles.heroAuthors}>
                    <div className={styles.authorAvatars} aria-hidden="true">
                      {['A', 'E'].map((initials) => (
                        <div key={initials} className={styles.authorAvatar}>
                          <div className={styles.authorAvatarInner}>{initials}</div>
                        </div>
                      ))}
                    </div>
                    <span className={styles.authorLabel}>{t('featuredAuthors')}</span>
                  </div>
                </div>
              </div>

              {/* Visual col */}
              <div className={styles.heroVisualCol}>
                <div className={styles.heroVisualWrap}>
                  <div className={styles.heroVisualGlow} aria-hidden="true" />
                  <div className={styles.heroVisualCard} aria-label="Featured article visual">
                    <div className={styles.heroVisualPlaceholder} aria-hidden="true">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '4rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                      >
                        architecture
                      </span>
                      <span style={{ fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                        Softium Engineering
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Client section (categories + grid + newsletter) ── */}
        <BlogClient />

      </main>
      <Footer />
    </>
  );
}
