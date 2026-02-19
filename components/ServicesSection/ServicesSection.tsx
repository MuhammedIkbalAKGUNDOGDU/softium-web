'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './ServicesSection.module.css';

const SERVICE_ICONS = {
  ai: 'psychology',
  cloud: 'cloud_done',
  saas: 'deployed_code',
  data: 'monitoring',
  marketing: 'rocket_launch',
  devops: 'settings_suggest',
};

const SERVICE_COLORS = {
  ai: '#7c3aed',
  cloud: '#0ea5e9',
  saas: '#135bec',
  data: '#10b981',
  marketing: '#f59e0b',
  devops: '#ef4444',
};

const SERVICE_KEYS = ['ai', 'cloud', 'saas', 'data', 'marketing', 'devops'] as const;

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getServiceHref = (key: string) => {
    const base = locale === 'tr' ? '/hizmetler' : '/services';
    return `/${locale}${base}#${key}`;
  };

  return (
    <section className={styles.section} id="services" ref={sectionRef} aria-labelledby="services-title">
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal`}>
          <div className="badge" aria-label="Section badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>grid_view</span>
            {t('badge')}
          </div>
          <h2 className="section-title" id="services-title">
            {t('title')}
          </h2>
          <p className="section-subtitle">
            {t('subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid} role="list">
          {SERVICE_KEYS.map((key, i) => (
            <article
              key={key}
              id={`service-${key}`}
              className={`card ${styles.card} reveal reveal-delay-${(i % 3) + 1}`}
              role="listitem"
              aria-label={t(`items.${key}.title`)}
            >
              {/* Icon */}
              <div
                className={styles.iconBox}
                style={{
                  background: `${SERVICE_COLORS[key]}14`,
                  color: SERVICE_COLORS[key],
                }}
                aria-hidden="true"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '1.625rem', fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                >
                  {SERVICE_ICONS[key]}
                </span>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
                <p className={styles.cardDesc}>{t(`items.${key}.description`)}</p>
              </div>

              {/* Footer Link */}
              <div className={styles.cardFooter}>
                <div className={styles.divider} />
                <Link
                  href={getServiceHref(key)}
                  className={styles.learnMore}
                  aria-label={`${t('learnMore')} - ${t(`items.${key}.title`)}`}
                >
                  {t('learnMore')}
                  <span
                    className={`material-symbols-outlined ${styles.arrowIcon}`}
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Hover accent bar */}
              <div
                className={styles.accentBar}
                style={{ background: SERVICE_COLORS[key] }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} reveal`}>
          <p className={styles.bottomCtaText}>
            {locale === 'tr'
              ? 'Tüm hizmetlerimizi ve detaylı çözümlerimizi görün'
              : 'View all our services and detailed solutions'}
          </p>
          <Link
            id="services-all-btn"
            href={`/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}`}
            className="btn-secondary"
          >
            {locale === 'tr' ? 'Tüm Hizmetler' : 'All Services'}
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
