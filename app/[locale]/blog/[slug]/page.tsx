import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './blogReader.module.css';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

interface BlogPost {
  id: string;
  slug: string;
  titleTr: string;
  titleEn?: string;
  titleDe?: string;
  contentTr: string;
  contentEn?: string;
  contentDe?: string;
  category?: string;
  readTime: number;
  authorName?: string;
  authorRole?: string;
  coverImage?: string;
  publishedAt?: string;
  createdAt: string;
}

// Fetch single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`http://localhost:5262/api/blogposts/byslug/${slug}`, {
      next: { revalidate: 60 } // Next.js cache 60 sn
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch blog post');
    }
    
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Define specific Metadata to help SEO for this Article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) return { title: 'Not Found' };

  const titleStr = locale === 'en' && post.titleEn ? post.titleEn : 
                   locale === 'de' && post.titleDe ? post.titleDe : 
                   post.titleTr;

  return {
    title: `${titleStr} | Softium Blog`,
    description: `Okuma süresi: ${post.readTime} dakika. ${post.category || 'Teknoloji'} kategorisinden en son paylaşımlar.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = await getBlogPost(slug);
  
  // If no blog with that slug exists, show 404 Page automatically.
  if (!post) {
    notFound(); 
  }

  // Helper getters for multi-language handling
  const getTitle = () => {
    if (locale === 'en' && post.titleEn) return post.titleEn;
    if (locale === 'de' && post.titleDe) return post.titleDe;
    return post.titleTr;
  };

  const getContent = () => {
    if (locale === 'en' && post.contentEn) return post.contentEn;
    if (locale === 'de' && post.contentDe) return post.contentDe;
    return post.contentTr; // ReactQuill HTML String
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const articleTitle = getTitle();
  const articleContent = getContent();

  return (
    <div className={styles.articlePage}>
      <Navbar />
      
      <main id="main-content">
        
        {/* ── Top Header Text Section ────────────────────────── */}
        <header className={styles.articleHero}>
          <div className="container">
            
            <div className={styles.backWrap}>
               <Link href={`/${locale}/blog`} className={styles.backBtn}>
                 <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
                 Blog'a Dön
               </Link>
            </div>

            <div className={styles.heroInner}>
              {post.category && (
                <div className={styles.categoryBadge}>{post.category}</div>
              )}
              
              <h1 className={styles.title}>{articleTitle}</h1>

              <div className={styles.metaWrap}>
                <div className={styles.authorBlock}>
                  <div className={styles.authorAvatar}>
                    {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className={styles.authorMeta}>
                    <span className={styles.authorName}>{post.authorName || 'Softium Editor'}</span>
                    <span className={styles.authorRole}>{post.authorRole || 'Engineering Team'}</span>
                  </div>
                </div>
                
                <div className={styles.postMetaLine}>
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  <span className={styles.metaDot}></span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            
          </div>
        </header>

        {/* ── Main Cover Image Container ─────────────────────── */}
        {post.coverImage && (
          <div className={styles.coverSection}>
             <div className={styles.coverWrap}>
                <img src={post.coverImage} alt={articleTitle} className={styles.coverImage} />
             </div>
          </div>
        )}

        {/* ── Content (Dangerously Set HTML from Quill) ──────── */}
        <section className={styles.contentSection}>
           <div className="container">
              <div className={styles.contentInner}>
                 {/* 
                   ReactQuill generates raw HTML tags. We use dangerouslySetInnerHTML
                   to read string such as <strong>...</strong><p>...</p> and construct DOM.
                   Since this content can ONLY be authored by verified admins from our own DB,
                   it's practically safe against XSS out-of-the-box.
                 */}
                 <article 
                    className={styles.richText} 
                    dangerouslySetInnerHTML={{ __html: articleContent }} 
                 />
              </div>
           </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
