'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './StatsSection.module.css';

const STAT_KEYS = ['projects', 'clients', 'engineers', 'uptime'] as const;
const STAT_ICONS = ['folder_open', 'groups', 'engineering', 'verified'] as const;

export default function StatsSection() {
  const t = useTranslations('stats');
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
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="stats" aria-labelledby="stats-title">
      <div className={styles.bgPattern} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          {/* Left: Image */}
          <div className={`${styles.imageWrapper} reveal`}>
            <Image
              src="/about-office.jpg"
              alt="Softium Technologies team collaborating in modern office"
              width={600}
              height={450}
              className={styles.officeImg}
            />
            {/* Overlay badge */}
            <div className={styles.imageBadge}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#22c55e', fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <div>
                <div className={styles.badgeTitle}>ISO 27001</div>
                <div className={styles.badgeSubtitle}>Certified</div>
              </div>
            </div>

            <div className={styles.imageBadge2}>
              <div className={styles.badge2Value}>10+</div>
              <div className={styles.badge2Label}>Yıllık Deneyim</div>
            </div>
          </div>

          {/* Right: Stats & Text */}
          <div className={styles.content}>
            <div className={`reveal`}>
              <div className="badge" style={{ marginBottom: '1.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bar_chart</span>
                {t('title')}
              </div>
              <h2 className="section-title" id="stats-title" style={{ textAlign: 'left', marginBottom: '0.75rem' }}>
                {t('subtitle')}
              </h2>
              <p className={styles.description}>
                Dünya genelinde 40'tan fazla enterprise müşterimize yüksek performanslı yazılım çözümleri sunuyoruz.
                Her projede mükemmelliği hedefliyoruz.
              </p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              {STAT_KEYS.map((key, i) => (
                <div
                  key={key}
                  id={`stat-${key}`}
                  className={`${styles.statCard} reveal reveal-delay-${i + 1}`}
                  aria-label={`${t(`items.${key}.value`)} ${t(`items.${key}.label`)}`}
                >
                  <div className={styles.statIcon} aria-hidden="true">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '1.375rem', fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                    >
                      {STAT_ICONS[i]}
                    </span>
                  </div>
                  <div className={styles.statValue}>{t(`items.${key}.value`)}</div>
                  <div className={styles.statLabel}>{t(`items.${key}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
