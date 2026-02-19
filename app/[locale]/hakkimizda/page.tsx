import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './about.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

const CORE_VALUES = [
  {
    icon: 'precision_manufacturing',
    key: 'precision',
  },
  {
    icon: 'hub',
    key: 'distributed',
  },
  {
    icon: 'diversity_3',
    key: 'humanCentric',
  },
] as const;

const STATS = [
  { value: '500M+', labelKey: 'requests' },
  { value: '99.99%', labelKey: 'uptime' },
  { value: '40+', labelKey: 'countries' },
] as const;



export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const contactHref = `/${locale}${locale === 'tr' ? '/iletisim' : locale === 'de' ? '/kontakt' : '/contact'}`;

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ───────────────────────────────────── */}
        <section className={styles.pageHero} aria-labelledby="about-hero-title">
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.heroOrb1} />
            <div className={styles.heroOrb2} />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroTag} aria-label="Section label">
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
              {t('badge')}
            </div>

            <h1 className={styles.heroTitle} id="about-hero-title">
              {t('heroTitle1')}{' '}
              <span className={styles.heroTitleAccent}>{t('heroTitle2')}</span>
            </h1>

            <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>

            <Link href={`#${locale === 'tr' ? 'misyon' : 'mission'}`} className={styles.heroCta} id="about-vision-btn">
              {t('heroCta')}
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_forward</span>
            </Link>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <span>Scroll</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>

        {/* ── Mission ─────────────────────────────────── */}
        <section
          className={styles.missionSection}
          id={locale === 'tr' ? 'misyon' : 'mission'}
          aria-labelledby="mission-title"
        >
          <div className="container">
            <div className={styles.missionGrid}>
              {/* Text */}
              <div className={styles.missionContent}>
                <h2 className={styles.missionTitle} id="mission-title">
                  {t('missionTitle')}
                </h2>
                <div className={styles.missionDivider} aria-hidden="true" />
                <p className={styles.missionBody}>{t('missionBody1')}</p>
                <p className={styles.missionBodySmall}>{t('missionBody2')}</p>
              </div>

              {/* Visual */}
              <div className={styles.missionVisual}>
                <div className={styles.missionImgWrap}>
                  <div className={styles.missionImgInner} aria-hidden="true">
                    <span className="material-symbols-outlined" style={{ fontSize: '4rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}>
                      architecture
                    </span>
                    <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                      Softium Architecture
                    </span>
                  </div>
                </div>

                <div className={styles.missionQuote} aria-hidden="true">
                  <p className={styles.missionQuoteText}>"{t('missionQuote')}"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────── */}
        <section className={styles.statsSection} aria-label="Global statistics">
          <div className="container">
            <div className={styles.statsGrid}>
              {STATS.map((stat) => (
                <div key={stat.labelKey}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{t(`stats.${stat.labelKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ────────────────────────────── */}
        <section className={styles.valuesSection} aria-labelledby="values-title">
          <div className="container">
            <div className={styles.valuesHeader}>
              <p className={styles.valuesEyebrow}>{t('valuesEyebrow')}</p>
              <h2 className={styles.valuesTitle} id="values-title">{t('valuesTitle')}</h2>
            </div>

            <div className={styles.valuesGrid}>
              {CORE_VALUES.map((val) => (
                <article key={val.key} className={styles.valueCard} id={`value-${val.key}`}>
                  <div className={styles.valueIconWrap} aria-hidden="true">
                    <span className="material-symbols-outlined">{val.icon}</span>
                  </div>
                  <h3 className={styles.valueName}>{t(`values.${val.key}.name`)}</h3>
                  <p className={styles.valueDesc}>{t(`values.${val.key}.desc`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────── */}
        <section className={styles.ctaBanner} aria-labelledby="about-cta-title">
          <div className={styles.ctaInner}>
            <div className={styles.ctaBgPattern} aria-hidden="true" />
            <h2 className={styles.ctaTitle} id="about-cta-title">{t('ctaTitle')}</h2>
            <p className={styles.ctaSubtitle}>{t('ctaSubtitle')}</p>
            <div className={styles.ctaButtons}>
              <Link href={contactHref} className={styles.ctaBtnPrimary} id="about-cta-contact">
                {t('ctaContact')}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
