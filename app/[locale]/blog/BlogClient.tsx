'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './blog.module.css';

interface BlogPost {
  id: string;
  slug: string;
  titleTr: string;
  titleEn?: string;
  titleDe?: string;
  excerptTr?: string;
  excerptEn?: string;
  excerptDe?: string;
  category?: string;
  readTime: number;
  coverImage?: string;
  publishedAt?: string;
  createdAt: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const t = useTranslations('blog');
  const params = useParams();
  const locale = (params?.locale as string) || 'tr';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const [nlEmail, setNlEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlMessage, setNlMessage] = useState('');

  // Extract unique categories from actual posts
  const dynamicCategories = ['all'];
  posts.forEach(p => {
    if (p.category && !dynamicCategories.includes(p.category.toLowerCase())) {
      dynamicCategories.push(p.category.toLowerCase());
    }
  });

  const filtered = posts.filter(
    (a) => activeCategory === 'all' || (a.category && a.category.toLowerCase() === activeCategory)
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const getTitle = (post: BlogPost) => {
    if (locale === 'en' && post.titleEn) return post.titleEn;
    if (locale === 'de' && post.titleDe) return post.titleDe;
    return post.titleTr;
  };

  const getExcerpt = (post: BlogPost) => {
    if (locale === 'en' && post.excerptEn) return post.excerptEn;
    if (locale === 'de' && post.excerptDe) return post.excerptDe;
    return post.excerptTr;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <>
      {/* ── Category Bar ───────────────────────────── */}
      <div className={styles.categoryBar} role="navigation" aria-label="Blog categories">
        <div className={`container ${styles.categoryInner}`}>
          {dynamicCategories.map((cat) => (
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
              {/* If we have a translation key, use it; otherwise just capitalize the dynamic category */}
              {cat === 'all' ? t(`categories.all`) : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
          </div>

          <div className={styles.articlesGrid}>
            {visible.length > 0 ? visible.map((article, idx) => (
              <Link
                href={`/${locale}/blog/${article.slug}`}
                key={article.id}
                className={styles.card}
                id={`blog-card-${article.slug}`}
                style={{ animationDelay: `${(idx % 3) * 0.1}s` }}
              >
                <div className={styles.cardThumb}>
                   {article.coverImage ? (
                     <img src={article.coverImage} alt={getTitle(article)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                   ) : (
                    <div className={styles.cardThumbInner}>
                      <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>description</span>
                    </div>
                   )}
                </div>

                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{article.category ? article.category : 'BLOG'}</span>
                  <span className={styles.cardDot}></span>
                  <span className={styles.cardReadTime}>{article.readTime} min read</span>
                  <span className={styles.cardDot} style={{ marginLeft: '0.2rem' }}></span>
                  <span className={styles.cardReadTime} style={{ marginLeft: '0.2rem', textTransform: 'none' }}>{formatDate(article.publishedAt || article.createdAt)}</span>
                </div>

                <h3 className={styles.cardTitle}>{getTitle(article)}</h3>
                <p className={styles.cardExcerpt}>{getExcerpt(article) || 'Okumaya devam et...'}</p>
              </Link>
            )) : (
               <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                 Bu kategoride henüz yazı bulunamadı.
               </div>
            )}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount((p) => p + 6)}
                id="blog-load-more"
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
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterBg} aria-hidden="true" />
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle} id="newsletter-title">
                {t('newsletterTitle')}
              </h2>
              <p className={styles.newsletterDesc}>{t('newsletterDesc')}</p>
              
              <form 
                className={styles.newsletterForm}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if(!nlEmail) return;
                  setNlLoading(true);
                  try {
                    const res = await fetch('http://localhost:5262/api/newsletter/subscribe', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ email: nlEmail })
                    });
                    if (res.ok) {
                      setNlMessage(locale === 'tr' ? 'Bültenimize başarıyla abone oldunuz!' : 'Successfully subscribed to our newsletter!');
                      setNlEmail('');
                    } else {
                      setNlMessage(locale === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.');
                    }
                  } catch (e) {
                     setNlMessage(locale === 'tr' ? 'Bağlantı hatası!' : 'Connection error!');
                  } finally {
                     setNlLoading(false);
                     setTimeout(() => setNlMessage(''), 5000);
                  }
                }}
              >
                <input
                  type="email"
                  className={styles.newsletterInput}
                  placeholder={t('newsletterPlaceholder')}
                  required
                  aria-label="Email address"
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  disabled={nlLoading}
                />
                <button type="submit" className={styles.newsletterBtn} id="blog-subscribe-btn" disabled={nlLoading}>
                  {nlLoading ? '...' : t('newsletterBtn')}
                  <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                    mark_email_read
                  </span>
                </button>
              </form>
              {nlMessage && <p style={{marginTop: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem'}}>{nlMessage}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
