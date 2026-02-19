'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './blog.module.css';

const CATEGORIES = ['all', 'engineering', 'innovation', 'companyNews', 'openSource', 'design'] as const;
type Category = typeof CATEGORIES[number];

const ARTICLES = [
  {
    id: 'distributed-tracing',
    category: 'engineering' as Category,
    icon: 'hub',
    readMinutes: 8,
  },
  {
    id: 'ai-ethics',
    category: 'innovation' as Category,
    icon: 'psychology',
    readMinutes: 5,
  },
  {
    id: 'q3-report',
    category: 'companyNews' as Category,
    icon: 'bar_chart',
    readMinutes: 12,
  },
  {
    id: 'ux-saas',
    category: 'design' as Category,
    icon: 'design_services',
    readMinutes: 6,
  },
  {
    id: 'supply-chain',
    category: 'engineering' as Category,
    icon: 'security',
    readMinutes: 10,
  },
  {
    id: 'nebula-open-source',
    category: 'openSource' as Category,
    icon: 'code',
    readMinutes: 4,
  },
] as const;

export default function BlogClient() {
  const t = useTranslations('blog');
  const params = useParams();
  const locale = (params?.locale as string) || 'tr';
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = ARTICLES.filter(
    (a) => activeCategory === 'all' || a.category === activeCategory
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      {/* ── Category Bar ───────────────────────────── */}
      <div className={styles.categoryBar} role="navigation" aria-label="Blog categories">
        <div className={`container ${styles.categoryInner}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-${cat}`}
              className={`${styles.catLink} ${activeCategory === cat ? styles.catLinkActive : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(6);
              }}
              aria-pressed={activeCategory === cat}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Articles Grid ──────────────────────────── */}
      <section className={styles.articlesSection} aria-labelledby="articles-title">
        <div className="container">
          <div className={styles.articlesHeader}>
            <div>
              <h2 className={styles.articlesTitle} id="articles-title">
                {t('latestTitle')}
              </h2>
              <p className={styles.articlesSubtitle}>{t('latestSubtitle')}</p>
            </div>
            <button className={styles.viewAllBtn} id="view-all-posts-btn">
              {t('viewAll')}
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
            </button>
          </div>

          <div className={styles.articlesGrid} role="list">
            {visible.map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.id}`}
                className={styles.card}
                id={`article-${article.id}`}
                role="listitem"
              >
                {/* Thumbnail */}
                <div className={styles.cardThumb} aria-hidden="true">
                  <div className={styles.cardThumbInner}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                    >
                      {article.icon}
                    </span>
                    <span style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                      {t(`articles.${article.id}.category`)}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>
                    {t(`articles.${article.id}.category`)}
                  </span>
                  <span className={styles.cardDot} aria-hidden="true" />
                  <span className={styles.cardReadTime}>
                    {article.readMinutes} {t('minRead')}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <h3 className={styles.cardTitle}>
                  {t(`articles.${article.id}.title`)}
                </h3>
                <p className={styles.cardExcerpt}>
                  {t(`articles.${article.id}.excerpt`)}
                </p>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                className={styles.loadMoreBtn}
                id="load-more-btn"
                onClick={() => setVisibleCount((c) => c + 3)}
              >
                {t('loadMore')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────── */}
      <section className={styles.newsletterSection} aria-labelledby="newsletter-title">
        <div className="container">
          <div className={styles.newsletterInner}>
            <span className={`material-symbols-outlined ${styles.newsletterIcon}`} aria-hidden="true">
              mail
            </span>
            <h2 className={styles.newsletterTitle} id="newsletter-title">
              {t('newsletter.title')}
            </h2>
            <p className={styles.newsletterSubtitle}>{t('newsletter.subtitle')}</p>

            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()} aria-label="Newsletter subscription form">
              <input
                id="newsletter-email"
                type="email"
                placeholder={t('newsletter.placeholder')}
                className={styles.newsletterInput}
                aria-label={t('newsletter.placeholder')}
                required
              />
              <button type="submit" className={styles.newsletterBtn} id="newsletter-submit-btn">
                {t('newsletter.cta')}
              </button>
            </form>
            <p className={styles.newsletterNote}>{t('newsletter.note')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
