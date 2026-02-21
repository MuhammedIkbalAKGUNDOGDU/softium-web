'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import styles from './TestimonialsSection.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quoteTr: string;
  quoteEn?: string;
  quoteDe?: string;
  color: string;
}

export default function TestimonialsSection({ locale }: { locale: string }) {
  const t = useTranslations('testimonials');
  const sectionRef = useRef<HTMLElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('http://localhost:5262/api/testimonials/active');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (e) {
        console.error('Testimonials could not be fetched', e);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (loading || testimonials.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, testimonials]);

  if (loading || testimonials.length === 0) return null;

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
          {testimonials.map((item, i) => {
            const initials = item.name.split(' ').map(n => n[0]).join('').substring(0, 2);
            let quote = item.quoteTr;
            if (locale === 'en' && item.quoteEn) quote = item.quoteEn;
            if (locale === 'de' && item.quoteDe) quote = item.quoteDe;

            return (
              <article
                key={item.id}
                id={`testimonial-${i + 1}`}
                className={`${styles.card} reveal reveal-delay-${(i % 3) + 1}`}
                aria-label={`Testimonial from ${item.name}`}
              >
                {/* Quote Mark */}
                <div className={styles.quoteIcon} aria-hidden="true">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '2rem', color: item.color || '#135bec', opacity: 0.2, fontVariationSettings: "'FILL' 1" }}
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
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className={styles.author}>
                  <div
                    className={styles.avatar}
                    style={{ background: `${item.color || '#135bec'}22`, color: item.color || '#135bec' }}
                    aria-hidden="true"
                  >
                    {initials}
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
                  style={{ background: item.color || '#135bec' }}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
