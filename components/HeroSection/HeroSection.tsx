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
  logoUrl?: string;
  websiteUrl?: string;
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const hasAnimated = useRef(false);
  const [clients, setClients] = useState<Reference[]>([]);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
    }

    // Backend'den aktif referanslari cek ve anasayfada sergile
    fetch('http://localhost:5262/api/references')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const activeRefs = data.filter((r: any) => r.isActive).map(r => ({
            id: r.id, 
            name: r.name,
            logoUrl: r.logoUrl,
            websiteUrl: r.websiteUrl
          }));
          setClients(activeRefs.slice(0, 5)); // Maksimum 5 adet göster
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
            <Link href="#" className={styles.badgeLink}>
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
            <Link
              href={`/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}`}
              id="hero-explore-btn"
              className="btn-primary"
            >
              {t('cta1')}
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', transition: 'transform 0.2s' }}>
                arrow_forward
              </span>
            </Link>
            <button id="hero-showreel-btn" className={styles.showreelBtn} aria-label="Watch showreel video">
              <div className={styles.playIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </div>
              {t('cta2')}
            </button>
          </div>

          {/* Stats Row */}
          <div className={`${styles.statsRow} animate-fade-up`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{t('stat1Value')}</span>
              <span className={styles.statLabel}>{t('stat1Label')}</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{t('stat2Value')}</span>
              <span className={styles.statLabel}>{t('stat2Label')}</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{t('stat3Value')}</span>
              <span className={styles.statLabel}>{t('stat3Label')}</span>
            </div>
          </div>

          {/* Trusted By */}
          <div className={`${styles.trustedBy} animate-fade-up`} style={{ animationDelay: '0.5s' }}>
            <p className={styles.trustedLabel}>{t('trustedBy')}</p>
            <div className={styles.clientLogos}>
              {clients.length > 0 ? clients.map((client) => {
                const innerContent = client.logoUrl ? (
                  <img src={client.logoUrl} alt={client.name} style={{ height: '24px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.8, transition: 'all 0.3s' }} />
                ) : (
                  <span>{client.name.toUpperCase()}</span>
                );

                return (
                  <div key={client.id} className={styles.clientLogo}>
                    {client.websiteUrl ? (
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                        {innerContent}
                      </a>
                    ) : innerContent}
                  </div>
                );
              }) : (
                ['MICROSOFT', 'ORACLE', 'AWS', 'STRIPE', 'VERCEL'].map((name) => (
                  <div key={name} className={styles.clientLogo}>
                    <span>{name}</span>
                  </div>
                ))
              )}
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
                <span className={styles.cardLabel}>{locale === 'tr' ? 'Sistem Durumu' : 'System Status'}</span>
                <div className={styles.statusDot}>
                  <span className={styles.statusPing} />
                  <span className={styles.statusCore} />
                </div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '98%' }} />
              </div>
              <div className={styles.progressMeta}>
                <span>{locale === 'tr' ? 'Optimizasyon' : 'Optimization'}</span>
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
                <div className={styles.cardLabel}>{locale === 'tr' ? 'Güvenlik Seviyesi' : 'Security Level'}</div>
                <div className={styles.cardValue}>{locale === 'tr' ? 'Enterprise Kalkan' : 'Enterprise Shield'}</div>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardAI} animate-float`} style={{ animationDelay: '1.5s' }}>
              <div className={styles.aiIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', fontVariationSettings: "'FILL' 1" }}>
                  psychology
                </span>
              </div>
              <div>
                <div className={styles.cardLabel}>AI Engine</div>
                <div className={styles.cardValue}>Active · v2.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
