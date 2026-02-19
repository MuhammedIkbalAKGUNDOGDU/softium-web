'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './CTASection.module.css';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="cta" aria-labelledby="cta-title">
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.content} reveal`}>
          <h2 className={styles.title} id="cta-title">
            {t('title')}
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          <div className={styles.actions}>
            <Link
              id="cta-start-btn"
              href={`/${locale}${locale === 'tr' ? '/iletisim' : '/contact'}`}
              className={styles.primaryBtn}
            >
              {t('button1')}
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                arrow_forward
              </span>
            </Link>
            <Link
              id="cta-sales-btn"
              href={`/${locale}${locale === 'tr' ? '/iletisim' : '/contact'}#sales`}
              className={styles.secondaryBtn}
            >
              {t('button2')}
            </Link>
          </div>

          {/* Trust signals */}
          <div className={styles.trustSignals}>
            {[
              { icon: 'verified', label: locale === 'tr' ? 'ISO 27001 Sertifikalı' : 'ISO 27001 Certified' },
              { icon: 'schedule', label: locale === 'tr' ? '48 Saat İçinde Yanıt' : 'Response within 48h' },
              { icon: 'support_agent', label: locale === 'tr' ? '7/24 Destek' : '24/7 Support' },
            ].map((item, i) => (
              <div key={i} className={styles.trustItem}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '1rem', fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
