import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BlogClient from './BlogClient';
import styles from './blog.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

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
  isFeatured: boolean;
  authorName?: string;
  coverImage?: string;
  publishedAt?: string;
  createdAt: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        tr: '/tr/blog',
        en: '/en/blog',
        de: '/de/blog',
      },
    },
  };
}

// Data Fetching Function Defaulting to the new Backend
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('http://localhost:5262/api/blogposts?onlyPublished=true', {
      next: { revalidate: 60 } // Next.js server caching validation (60 seconds)
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const allPosts = await getBlogPosts();
  
  // Find featured post (or fallback to the most recent one if no featured post exists)
  const featuredPost = allPosts.find(p => p.isFeatured) || allPosts[0];
  
  // Feature edilmiş blog Hero'da gösteriliyor ancak, alttaki gridde de yer alsın istenmiş
  const otherPosts = allPosts;

  const getTitle = (post?: BlogPost) => {
    if (!post) return t('featuredTitle');
    if (locale === 'en' && post.titleEn) return post.titleEn;
    if (locale === 'de' && post.titleDe) return post.titleDe;
    return post.titleTr;
  };

  const getExcerpt = (post?: BlogPost) => {
    if (!post) return t('featuredExcerpt');
    if (locale === 'en' && post.excerptEn) return post.excerptEn;
    if (locale === 'de' && post.excerptDe) return post.excerptDe;
    return post.excerptTr;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('featuredDate');
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ─────────────────────────────────── */}
        <section className={styles.heroSection} aria-labelledby="blog-hero-title">
          <div className="container">
            <div className={styles.heroGrid}>

              {/* Text col */}
              <div>
                <div className={styles.heroMeta}>
                  <span className={styles.featuredBadge}>{t('featuredLabel')}</span>
                  <span className={styles.heroDate}>{formatDate(featuredPost?.publishedAt || featuredPost?.createdAt)}</span>
                </div>

                <h1 className={styles.heroTitle} id="blog-hero-title">
                  {getTitle(featuredPost)}
                </h1>

                <p className={styles.heroSubtitle}>{getExcerpt(featuredPost)}</p>

                <div className={styles.heroCta}>
                  {featuredPost ? (
                    <Link
                      href={`/${locale}/blog/${featuredPost.slug}`}
                      className={styles.heroBtn}
                      id="blog-hero-read-btn"
                    >
                      {t('readInsight')}
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                        arrow_forward
                      </span>
                    </Link>
                  ) : (
                    <div className={styles.heroBtn} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                      Henüz içerik yok
                    </div>
                  )}

                  <div className={styles.heroAuthors}>
                    <div className={styles.authorAvatars} aria-hidden="true">
                      {featuredPost?.authorName ? (
                        <div className={styles.authorAvatar}>
                          <div className={styles.authorAvatarInner}>{featuredPost.authorName.charAt(0).toUpperCase()}</div>
                        </div>
                      ) : (
                        ['S', 'E'].map((initials) => (
                           <div key={initials} className={styles.authorAvatar}>
                             <div className={styles.authorAvatarInner}>{initials}</div>
                           </div>
                        ))
                      )}
                    </div>
                    <span className={styles.authorLabel}>{featuredPost?.authorName || 'Softium Editor'}</span>
                  </div>
                </div>
              </div>

              {/* Visual col */}
              <div className={styles.heroVisualCol}>
                <div className={styles.heroVisualWrap}>
                  <div className={styles.heroVisualGlow} aria-hidden="true" />
                  <div className={styles.heroVisualCard} aria-label="Featured article visual" style={{ overflow: 'hidden' }}>
                    
                    {featuredPost?.coverImage ? (
                      <img src={featuredPost.coverImage} alt={getTitle(featuredPost)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }} />
                    ) : (
                      <div className={styles.heroVisualPlaceholder} aria-hidden="true">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '4rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                        >
                          architecture
                        </span>
                        <span style={{ fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                          Softium Engineering
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Client section (categories + grid + newsletter) ── */}
        <BlogClient posts={otherPosts} />

      </main>
      <Footer />
    </>
  );
}
