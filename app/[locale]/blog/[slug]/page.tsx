import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import {
  ReadingProgress,
  ScrollTopBtn,
  SideControls,
  NewsletterForm,
} from './ArticleClient';
import styles from './article.module.css';

/* ─── Article slugs that exist ───────────────── */
export const ARTICLE_SLUGS = [
  'quantum-computing',
  'distributed-tracing',
  'ai-ethics',
  'q3-report',
  'ux-saas',
  'supply-chain',
  'nebula-open-source',
] as const;

type Slug = typeof ARTICLE_SLUGS[number];

export async function generateStaticParams() {
  const locales = ['tr', 'en', 'de'];
  return locales.flatMap((locale) =>
    ARTICLE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(ARTICLE_SLUGS as readonly string[]).includes(slug)) return {};
  const allArticles = await getTranslations({ locale, namespace: 'blogArticles' });
  return {
    title: `${allArticles(`${slug}.title` as Parameters<typeof allArticles>[0])} | Softium Blog`,
    description: allArticles(`${slug}.excerpt` as Parameters<typeof allArticles>[0]),
  };
}

/* ─── Related articles per slug ─────────────── */
const RELATED_MAP: Record<Slug, Array<{ slug: Slug; icon: string; cat: string }>> = {
  'quantum-computing': [
    { slug: 'ai-ethics', icon: 'psychology', cat: 'innovation' },
    { slug: 'supply-chain', icon: 'security', cat: 'engineering' },
    { slug: 'nebula-open-source', icon: 'code', cat: 'openSource' },
  ],
  'distributed-tracing': [
    { slug: 'quantum-computing', icon: 'hub', cat: 'engineering' },
    { slug: 'supply-chain', icon: 'security', cat: 'engineering' },
    { slug: 'nebula-open-source', icon: 'code', cat: 'openSource' },
  ],
  'ai-ethics': [
    { slug: 'quantum-computing', icon: 'hub', cat: 'engineering' },
    { slug: 'ux-saas', icon: 'design_services', cat: 'design' },
    { slug: 'distributed-tracing', icon: 'hub', cat: 'engineering' },
  ],
  'q3-report': [
    { slug: 'ai-ethics', icon: 'psychology', cat: 'innovation' },
    { slug: 'nebula-open-source', icon: 'code', cat: 'openSource' },
    { slug: 'ux-saas', icon: 'design_services', cat: 'design' },
  ],
  'ux-saas': [
    { slug: 'ai-ethics', icon: 'psychology', cat: 'innovation' },
    { slug: 'q3-report', icon: 'bar_chart', cat: 'companyNews' },
    { slug: 'nebula-open-source', icon: 'code', cat: 'openSource' },
  ],
  'supply-chain': [
    { slug: 'quantum-computing', icon: 'hub', cat: 'engineering' },
    { slug: 'distributed-tracing', icon: 'hub', cat: 'engineering' },
    { slug: 'q3-report', icon: 'bar_chart', cat: 'companyNews' },
  ],
  'nebula-open-source': [
    { slug: 'distributed-tracing', icon: 'hub', cat: 'engineering' },
    { slug: 'supply-chain', icon: 'security', cat: 'engineering' },
    { slug: 'ai-ethics', icon: 'psychology', cat: 'innovation' },
  ],
};

/* ─── Code block for quantum-computing article ── */
function QuantumCodeBlock() {
  return (
    <div className={styles.codeBlock} aria-label="Code example">
      <pre>
        <code>
          <span className={styles.codeKeyword}>import</span>
          {' qiskit\n'}
          <span className={styles.codeImport}>from</span>
          {' qiskit '}
          <span className={styles.codeKeyword}>import</span>
          {' QuantumCircuit, execute, Aer\n\n'}
          <span className={styles.codeComment}># Define a 2-qubit Bell state circuit</span>
          {'\ncircuit = QuantumCircuit(2, 2)\ncircuit.h(0)\ncircuit.cx(0, 1)\ncircuit.measure([0,1], [0,1])\n\n'}
          <span className={styles.codeComment}># Execute on local simulator</span>
          {'\nbackend = Aer.get_backend('}
          <span className={styles.codeString}>&apos;qasm_simulator&apos;</span>
          {')\njob = execute(circuit, backend, shots=1024)\nresult = job.result()\nprint(result.get_counts(circuit))'}
        </code>
      </pre>
    </div>
  );
}

/* ─── Page ───────────────────────────────────── */
export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;

  if (!(ARTICLE_SLUGS as readonly string[]).includes(slug)) {
    notFound();
  }

  const typedSlug = slug as Slug;
  // Fetch the whole blogArticles namespace at once to avoid issues with
  // tire-containing slug names in dynamic namespace keys.
  const allArticles = await getTranslations({ locale, namespace: 'blogArticles' });
  const ui = await getTranslations({ locale, namespace: 'blog' });
  const related = RELATED_MAP[typedSlug];

  // Helper to get a field from a specific article slug
  const a = (articleSlug: string, field: string) =>
    allArticles(`${articleSlug}.${field}` as Parameters<typeof allArticles>[0]);

  // Convenience shortcut for current article
  const t = (field: string) => a(typedSlug, field);

  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────── */}
        <header className={styles.articleHero}>
          <div className={styles.heroCats} aria-label="Article categories">
            <span>{t('category')}</span>
            <span className={styles.catDot} aria-hidden="true" />
            <span>{t('subCategory')}</span>
          </div>

          <h1 className={styles.articleTitle}>{t('title')}</h1>

          <div className={styles.authorRow}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar} aria-hidden="true">
                {t('authorInitial')}
              </div>
              <div>
                <p className={styles.authorName}>{t('authorName')}</p>
                <p className={styles.authorRole}>{t('authorRole')}</p>
              </div>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>calendar_today</span>
              <span>{t('date')}</span>
            </div>

            <div className={styles.metaItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>schedule</span>
              <span>{t('readTime')}</span>
            </div>
          </div>
        </header>

        {/* ── Article body ─────────────────────── */}
        <div className={styles.articleWrap}>
          <SideControls
            likeCount="1.2K"
            likeLabel={ui('sidelike')}
            shareLabel={ui('sideshare')}
          />

          <div className={styles.articleBody}>
            {/* Hero Image */}
            <figure className={styles.heroImage} aria-label={t('imageAlt')}>
              <div className={styles.heroImagePlaceholder} aria-hidden="true">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '4rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                >
                  {t('heroIcon')}
                </span>
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Softium {t('category')}
                </span>
              </div>
            </figure>

            {/* Prose */}
            <div className={styles.prose}>
              {/* Intro paragraph with drop cap */}
              <p className={styles.proseFirstP}>{t('intro')}</p>
              <p>{t('body1')}</p>

              <h2 className={styles.proseH2}>{t('section1Title')}</h2>
              <p>{t('section1Body')}</p>

              <ul className={styles.proseList} role="list">
                {(['listItem1', 'listItem2', 'listItem3'] as const).map((key) => (
                  <li key={key} className={styles.proseListItem}>
                    <span className={`material-symbols-outlined ${styles.proseListIcon}`}>check_circle</span>
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>

              <blockquote className={styles.proseBlockquote}>
                &ldquo;{t('quote')}&rdquo;
              </blockquote>

              <h2 className={styles.proseH2}>{t('section2Title')}</h2>

              {typedSlug === 'quantum-computing' && <QuantumCodeBlock />}

              <p>{t('section2Body')}</p>
            </div>

            {/* Tags */}
            <div className={styles.tagRow} role="list" aria-label="Article tags">
              {(['tag1', 'tag2', 'tag3'] as const).map((key) => (
                <span key={key} className={styles.tag} role="listitem">
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Insights ─────────────────── */}
        <section className={styles.relatedSection} aria-labelledby="related-title">
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle} id="related-title">
                {ui('relatedTitle')}
              </h2>
              <a href={`/${locale}/blog`} className={styles.relatedViewAll} id="related-view-all">
                {ui('viewAll')}
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </a>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((rel, idx) => (
                <a
                  key={rel.slug}
                  href={`/${locale}/blog/${rel.slug}`}
                  id={`related-card-${idx + 1}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedThumb} aria-hidden="true">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                    >
                      {rel.icon}
                    </span>
                  </div>
                  <p className={styles.relatedCat}>
                    {ui(`categories.${rel.cat}`)}
                  </p>
                  <h3 className={styles.relatedCardTitle}>
                    {a(rel.slug, 'title')}
                  </h3>
                  <p className={styles.relatedCardExcerpt}>
                    {a(rel.slug, 'excerpt')}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter ────────────────────────── */}
        <div className={styles.newsletterWrap}>
          <h2 className={styles.newsletterTitle}>{ui('newsletter.title')}</h2>
          <p className={styles.newsletterSubtitle}>{ui('newsletter.subtitle')}</p>
          <NewsletterForm
            placeholder={ui('newsletter.placeholder')}
            btnLabel={ui('newsletter.cta')}
          />
        </div>
      </main>

      <Footer />
      <ScrollTopBtn />
    </>
  );
}
