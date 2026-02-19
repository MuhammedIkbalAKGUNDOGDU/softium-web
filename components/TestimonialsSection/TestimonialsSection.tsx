'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    quote: 'Softium AI altyapımızı kısa sürede dönüştürdü. Sonuçlar inanılmaz.',
    quoteEn: 'Softium transformed our AI infrastructure rapidly. The results are incredible.',
    name: 'Mehmet Yılmaz',
    role: 'CTO',
    company: 'TechVision A.Ş.',
    initials: 'MY',
    color: '#135bec',
  },
  {
    quote: 'Bulut migrasyonunda gösterdikleri uzmanlık ve hız mükemmeldi.',
    quoteEn: 'Their expertise and speed in cloud migration was outstanding.',
    name: 'Sarah Johnson',
    role: 'VP Engineering',
    company: 'GlobalTech',
    initials: 'SJ',
    color: '#0ea5e9',
  },
  {
    quote: 'Özel SaaS platformumuz sayesinde müşteri memnuniyetimiz %40 arttı.',
    quoteEn: 'Our custom SaaS platform increased customer satisfaction by 40%.',
    name: 'Alex Chen',
    role: 'CEO',
    company: 'InnovateCo',
    initials: 'AC',
    color: '#7c3aed',
  },
];

export default function TestimonialsSection({ locale }: { locale: string }) {
  const t = useTranslations('testimonials');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-header reveal">
          <div className="badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>format_quote</span>
            {t('badge')}
          </div>
          <h2 className="section-title" id="testimonials-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((item, i) => (
            <article
              key={i}
              id={`testimonial-${i + 1}`}
              className={`${styles.card} reveal reveal-delay-${i + 1}`}
              aria-label={`Testimonial from ${item.name}`}
            >
              {/* Quote Mark */}
              <div className={styles.quoteIcon} aria-hidden="true">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '2rem', color: item.color, opacity: 0.2, fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
              </div>

              {/* Stars */}
              <div className={styles.stars} role="img" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontSize: '1rem', color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Quote text */}
              <blockquote className={styles.quote}>
                &ldquo;{locale === 'tr' ? item.quote : item.quoteEn}&rdquo;
              </blockquote>

              {/* Author */}
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: `${item.color}22`, color: item.color }}
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <div className={styles.authorName}>{item.name}</div>
                  <div className={styles.authorRole}>
                    {item.role}, <strong>{item.company}</strong>
                  </div>
                </div>
              </div>

              {/* Accent border */}
              <div
                className={styles.accentBorder}
                style={{ background: item.color }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
