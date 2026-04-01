'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import styles from './HeroSection.module.css';

interface Reference {
  id: string;
  name: string;
  industryTr?: string;
  industryEn?: string;
  industryDe?: string;
  descriptionTr?: string;
  descriptionEn?: string;
  descriptionDe?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const hasAnimated = useRef(false);
  const [clients, setClients] = useState<Reference[]>([]);
  const [stats, setStats] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
    }

    // Backend'den istatistikleri cek
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/statistics/active`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const map = data.reduce((acc: any, item: any) => {
            acc[item.key] = item;
            return acc;
          }, {});
          setStats(map);
        }
      })
      .catch(err => console.error("Istatistikler çekilemedi: ", err));

    // Backend'den aktif referanslari cek ve anasayfada sergile
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/references`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const activeRefs = data.filter((r: any) => r.isActive).map(r => ({
            id: r.id, 
            name: r.name,
            industryTr: r.industryTr,
            industryEn: r.industryEn,
            industryDe: r.industryDe,
            descriptionTr: r.descriptionTr,
            descriptionEn: r.descriptionEn,
            descriptionDe: r.descriptionDe,
            logoUrl: r.logoUrl,
            websiteUrl: r.websiteUrl
          }));
          setClients(activeRefs.slice(0, 10)); // Sayıyı biraz artırdım
        }
      })
      .catch(err => console.error("Referanslar cekilemedi: ", err));
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero section">
      {/* Background gradients */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left: Text Content */}
        <div className={styles.content}>
          {/* Badge */}
          <div className={`badge ${styles.badge} animate-fade-up`}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>new_releases</span>
            {t('badge')}
            <Link href={`/${locale}/blog`} className={styles.badgeLink}>
              {t('badgeLink')} →
            </Link>
          </div>

          {/* Headline */}
          <h1 className={`${styles.headline} animate-fade-up`} style={{ animationDelay: '0.1s' }}>
            <span className={styles.headlineNormal}>{t('headline1')} </span>
            <span className={`${styles.headlineGradient} text-gradient-primary`}>{t('headline2')} </span>
            <br className={styles.headlineBr} />
            <span className={styles.headlineNormal}>{t('headline3')}</span>
          </h1>

          {/* Subtitle */}
          <p className={`${styles.subtitle} animate-fade-up`} style={{ animationDelay: '0.2s' }}>
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.ctaGroup} animate-fade-up`} style={{ animationDelay: '0.3s' }}>
            <a
              href="#services"
              id="hero-explore-btn"
              className="btn-primary"
            >
              {t('cta1')}
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', transition: 'transform 0.2s' }}>
                arrow_forward
              </span>
            </a>
          </div>

          {/* Stats Row */}
          <div className={`${styles.statsRow} animate-fade-up`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats['hero_stat1']?.value || t('stat1Value')}</span>
              <span className={styles.statLabel}>
                {locale === 'tr' ? stats['hero_stat1']?.labelTr : (locale === 'en' ? stats['hero_stat1']?.labelEn : stats['hero_stat1']?.labelDe) || t('stat1Label')}
              </span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats['hero_stat2']?.value || t('stat2Value')}</span>
              <span className={styles.statLabel}>
                {locale === 'tr' ? stats['hero_stat2']?.labelTr : (locale === 'en' ? stats['hero_stat2']?.labelEn : stats['hero_stat2']?.labelDe) || t('stat2Label')}
              </span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats['hero_stat3']?.value || t('stat3Value')}</span>
              <span className={styles.statLabel}>
                {locale === 'tr' ? stats['hero_stat3']?.labelTr : (locale === 'en' ? stats['hero_stat3']?.labelEn : stats['hero_stat3']?.labelDe) || t('stat3Label')}
              </span>
            </div>
          </div>

          {/* Trusted By - Infinite Marquee */}
          <div className={`${styles.trustedBy} animate-fade-up`} style={{ animationDelay: '0.5s' }}>
            <p className={styles.trustedLabel}>{t('trustedBy')}</p>
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeContent}>
                {/* Original Items */}
                {clients.length > 0 ? clients.map((client) => {
                  const innerContent = client.logoUrl ? (
                    <img src={client.logoUrl} alt={client.name} className={styles.clientImg} />
                  ) : (
                    <span className={styles.clientText}>{client.name.toUpperCase()}</span>
                  );

                  return (
                    <div key={`orig-${client.id}`} className={styles.clientLogo}>
                      {client.websiteUrl ? (
                        <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.clientLink}>
                          {innerContent}
                        </a>
                      ) : (
                        innerContent
                      )}
                    </div>
                  );
                }) : (
                  ['MICROSOFT', 'ORACLE', 'AWS', 'STRIPE', 'VERCEL'].map((name) => (
                    <div key={`orig-def-${name}`} className={styles.clientLogo}>
                      <span className={styles.clientText}>{name}</span>
                    </div>
                  ))
                )}
                
                {/* Duplicated Items for Loop */}
                {clients.length > 0 ? clients.map((client) => {
                  const innerContent = client.logoUrl ? (
                    <img src={client.logoUrl} alt={client.name} className={styles.clientImg} />
                  ) : (
                    <span className={styles.clientText}>{client.name.toUpperCase()}</span>
                  );

                  return (
                    <div key={`dup-${client.id}`} className={styles.clientLogo}>
                      {client.websiteUrl ? (
                        <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.clientLink}>
                          {innerContent}
                        </a>
                      ) : (
                        innerContent
                      )}
                    </div>
                  );
                }) : (
                  ['MICROSOFT', 'ORACLE', 'AWS', 'STRIPE', 'VERCEL'].map((name) => (
                    <div key={`dup-def-${name}`} className={styles.clientLogo}>
                      <span className={styles.clientText}>{name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className={`${styles.visual} animate-float`}>
          {/* Main sphere image */}
          <div className={styles.sphereWrapper}>
            <Image
              src="/hero-sphere.png"
              alt="Advanced technology visualization - neural network sphere"
              width={600}
              height={600}
              priority
              className={styles.sphereImg}
            />

            {/* Floating cards */}
            <div className={`${styles.floatingCard} ${styles.cardSystem} animate-float`} style={{ animationDelay: '1s' }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>{t('systemStatus')}</span>
                <div className={styles.statusDot}>
                  <span className={styles.statusPing} />
                  <span className={styles.statusCore} />
                </div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '98%' }} />
              </div>
              <div className={styles.progressMeta}>
                <span>{t('optimization')}</span>
                <strong>98.4%</strong>
              </div>
              <div className={styles.avatarRow}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.avatar} style={{ background: `hsl(${210 + i * 20}, 70%, 60%)` }}>
                    {['S', 'M', 'D'][i - 1]}
                  </div>
                ))}
                <div className={`${styles.avatar} ${styles.avatarMore}`}>+5</div>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardSecurity} animate-float`} style={{ animationDelay: '2s' }}>
              <div className={styles.securityIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  security
                </span>
              </div>
              <div>
                <div className={styles.cardLabel}>{t('securityLevel')}</div>
                <div className={styles.cardValue}>{t('enterpriseShield')}</div>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardAI} animate-float`} style={{ animationDelay: '1.5s' }}>
              <div className={styles.aiIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', fontVariationSettings: "'FILL' 1" }}>
                  psychology
                </span>
              </div>
              <div>
                <div className={styles.cardLabel}>{t('aiEngine')}</div>
                <div className={styles.cardValue}>{t('activeStatus')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
