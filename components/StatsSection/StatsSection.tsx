'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './StatsSection.module.css';

interface Statistic {
  key: string;
  value: string;
  labelTr: string;
  labelEn?: string;
  labelDe?: string;
  icon: string;
}

const STAT_KEYS = ['projects', 'clients', 'engineers', 'uptime'] as const;
const STAT_ICONS = ['folder_open', 'groups', 'engineering', 'verified'] as const;

export default function StatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [statsMap, setStatsMap] = useState<Record<string, Statistic>>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5262/api/statistics/active');
        if (res.ok) {
          const data = await res.json();
          const map = data.reduce((acc: any, item: any) => {
            acc[item.key] = item;
            return acc;
          }, {});
          setStatsMap(map);
        }
      } catch (e) {
        console.error('Stats could not be fetched', e);
      }
    };
    fetchStats();
  }, []);

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
  }, [statsMap]);

  const getLabel = (item?: Statistic, defaultKey?: string) => {
    if (!item && defaultKey) return t(`items.${defaultKey}.label`);
    if (!item) return '';
    if (locale === 'en' && item.labelEn) return item.labelEn;
    if (locale === 'de' && item.labelDe) return item.labelDe;
    return item.labelTr;
  };

  const getValue = (item?: Statistic, defaultKey?: string) => {
    if (!item && defaultKey) return t(`items.${defaultKey}.value`);
    return item?.value || '';
  };

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
                <div className={styles.badgeTitle}>{statsMap['iso_title']?.value || 'ISO 27001'}</div>
                <div className={styles.badgeSubtitle}>{getLabel(statsMap['iso_title']) || 'Certified'}</div>
              </div>
            </div>

            <div className={styles.imageBadge2}>
              <div className={styles.badge2Value}>{statsMap['experience_value']?.value || '10+'}</div>
              <div className={styles.badge2Label}>{getLabel(statsMap['experience_value']) || (locale === 'tr' ? 'Yıllık Deneyim' : 'Years Experience')}</div>
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
              {STAT_KEYS.map((key, i) => {
                const dbKey = `grid_${key}`;
                const dbItem = statsMap[dbKey];
                return (
                  <div
                    key={key}
                    id={`stat-${key}`}
                    className={`${styles.statCard} reveal reveal-delay-${i + 1}`}
                    aria-label={`${getValue(dbItem, key)} ${getLabel(dbItem, key)}`}
                  >
                    <div className={styles.statIcon} aria-hidden="true">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '1.375rem', fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                      >
                        {dbItem?.icon || STAT_ICONS[i]}
                      </span>
                    </div>
                    <div className={styles.statValue}>{getValue(dbItem, key)}</div>
                    <div className={styles.statLabel}>{getLabel(dbItem, key)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
