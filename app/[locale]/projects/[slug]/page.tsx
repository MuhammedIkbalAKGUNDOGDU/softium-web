import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from '../projects.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectFeature {
  id: string;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  icon?: string;
}

interface Project {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  overlineTr: string;
  overlineEn: string;
  overlineDe: string;
  shortDescriptionTr: string;
  shortDescriptionEn: string;
  shortDescriptionDe: string;
  detailedContentTr: string;
  detailedContentEn: string;
  detailedContentDe: string;
  mainImage: string;
  hoverImage?: string;
  icon?: string;
  isDarkTheme: boolean;
  demoUrl?: string;
  documentUrl?: string;
  technicalSpecsTr?: string;
  technicalSpecsEn?: string;
  technicalSpecsDe?: string;
  features: ProjectFeature[];
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/slug/${slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProject(slug);
  
  if (!project) return { title: 'Not Found | Softium' };

  const title = locale === 'tr' ? project.titleTr : locale === 'en' ? project.titleEn : project.titleDe;
  const desc = locale === 'tr' ? project.shortDescriptionTr : locale === 'en' ? project.shortDescriptionEn : project.shortDescriptionDe;

  return {
    title: `${title} | Softium Technologies`,
    description: desc,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = await getProject(slug);

  if (!project) return notFound();

  // Localization Helpers
  const title = locale === 'tr' ? project.titleTr : locale === 'en' ? project.titleEn : project.titleDe;
  const overline = locale === 'tr' ? project.overlineTr : locale === 'en' ? project.overlineEn : project.overlineDe;
  const detailedContent = locale === 'tr' ? project.detailedContentTr : locale === 'en' ? project.detailedContentEn : project.detailedContentDe;
  const technicalSpecs = locale === 'tr' ? project.technicalSpecsTr : locale === 'en' ? project.technicalSpecsEn : project.technicalSpecsDe;

  return (
    <>
      <Navbar />
      <main className={project.isDarkTheme ? styles.darkSection : ''} style={{ paddingBottom: '0' }}>
        {/* Project Hero / Header Area */}
        <section className={styles.sectionHero} style={{ minHeight: '60vh', textAlign: 'left', alignItems: 'flex-start' }}>
            <div className={styles.heroContent} style={{ alignItems: 'flex-start' }}>
                <Link href={`/${locale}/projects`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600 }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    {locale === 'tr' ? 'Tüm Projeler' : locale === 'en' ? 'All Projects' : 'Alle Projekte'}
                </Link>
                <span className={styles.heroBadge}>{overline}</span>
                <h1 className={styles.heroTitle} style={{ textAlign: 'left' }}>{title}</h1>
                <p className={styles.heroDesc} style={{ textAlign: 'left', maxWidth: '100%' }}>
                    {locale === 'tr' ? project.shortDescriptionTr : locale === 'en' ? project.shortDescriptionEn : project.shortDescriptionDe}
                </p>
            </div>
        </section>

        {/* Full Width Visual */}
        <div style={{ width: '100%', maxHeight: '70vh', overflow: 'hidden', position: 'relative' }}>
            <img 
                src={project.mainImage} 
                alt={title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, white, transparent)' }}></div>
        </div>

        {/* Content Section */}
        <section className={styles.sectionProduct} style={{ padding: '8rem 1.5rem' }}>
            <div className={styles.productWrapper} style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '6rem' }}>
                {/* Detailed Narrative */}
                <div className={styles.textCol}>
                    <h2 className={styles.heading} style={{ fontSize: '2.5rem' }}>
                        {locale === 'tr' ? 'Genel Bakış' : locale === 'en' ? 'Overview' : 'Überblick'}
                    </h2>
                    <div 
                        className={styles.description} 
                        style={{ whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: detailedContent }}
                    ></div>

                    {technicalSpecs && (
                        <div style={{ marginTop: '4rem', padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '2rem' }}>
                            <h3 className={styles.heading} style={{ fontSize: '1.75rem', marginTop: 0 }}>
                                {locale === 'tr' ? 'Teknik Özellikler' : locale === 'en' ? 'Technical Specifications' : 'Technische Daten'}
                            </h3>
                            <div 
                                style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
                                dangerouslySetInnerHTML={{ __html: technicalSpecs }}
                            ></div>
                        </div>
                    )}
                </div>

                {/* Sidebar: Features & Links */}
                <div>
                   <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>
                                {locale === 'tr' ? 'Temel Kazanımlar' : locale === 'en' ? 'Key Benefits' : 'Hauptvorteile'}
                            </h4>
                            <ul className={styles.featureList}>
                                {project.features.map(feat => (
                                    <li key={feat.id} className={styles.featureItem} style={{ marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                        <span className={`material-symbols-outlined ${styles.featureIcon}`} style={{ marginTop: '2px' }}>
                                            {feat.icon || 'verified_user'}
                                        </span>
                                        <div>
                                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                                {locale === 'tr' ? feat.titleTr : locale === 'en' ? feat.titleEn : feat.titleDe}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {(project.demoUrl || project.documentUrl) && (
                            <div style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Kaynaklar</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} target="_blank" className={styles.btnPrimary} style={{ textDecoration: 'none', textAlign: 'center', fontSize: '1rem' }}>
                                            {locale === 'tr' ? 'Ürünü İncele' : 'Try Demo'}
                                        </a>
                                    )}
                                    {project.documentUrl && (
                                        <a href={project.documentUrl} target="_blank" className={styles.btnSecondary} style={{ textDecoration: 'none', textAlign: 'center', fontSize: '1rem' }}>
                                            {locale === 'tr' ? 'Dokümantasyon' : 'Documentation'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                   </div>
                </div>
            </div>
        </section>

        {/* Contact CTA */}
        <section className={styles.sectionCTA} style={{ backgroundColor: 'var(--bg-secondary)', padding: '10rem 1.5rem' }}>
            <div className={styles.ctaWrapper}>
                <h2 className={styles.heading} style={{ marginBottom: '1rem' }}>
                    {locale === 'tr' ? 'Bu Teknolojiyle Dönüşüme Başlayın' : 'Ready to Transform?'}
                </h2>
                <p className={styles.description}>
                    {locale === 'tr' ? 'Softium altyapısı ile işletmenizi geleceğe taşıyın.' : 'Implementation is the last piece of the puzzle.'}
                </p>
                <div className={styles.ctaButtons} style={{ marginTop: '3rem' }}>
                    <Link href={`/${locale}/iletisim`} className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
                        {locale === 'tr' ? 'Detaylı Bilgi Al' : 'Contact Us'}
                    </Link>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
