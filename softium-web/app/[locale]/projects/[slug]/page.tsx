import type { Metadata } from 'next';
import { useLocale } from 'next-intl';
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5262';
  try {
    const res = await fetch(`${apiUrl}/api/projects/slug/${slug}`, {
      next: { revalidate: 3600 }
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

  // URL resolution
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5262';
  const imageUrl = project.mainImage.startsWith('/uploads/') 
      ? `${apiUrl}${project.mainImage}` 
      : project.mainImage;

  // Localization Helpers
  const title = locale === 'tr' ? project.titleTr : locale === 'en' ? project.titleEn : project.titleDe;
  const overline = locale === 'tr' ? project.overlineTr : locale === 'en' ? project.overlineEn : project.overlineDe;
  const detailedContent = locale === 'tr' ? project.detailedContentTr : locale === 'en' ? project.detailedContentEn : project.detailedContentDe;
  const technicalSpecs = locale === 'tr' ? project.technicalSpecsTr : locale === 'en' ? project.technicalSpecsEn : project.technicalSpecsDe;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        {/* Project Hero / Header Area - Centered */}
        <section className={styles.sectionHero} style={{ minHeight: '50vh', padding: '120px 24px 60px' }}>
            <div className={styles.heroContent} style={{ maxWidth: '900px' }}>
                <Link href={`/${locale}/projeler`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', marginBottom: '2rem', fontWeight: 600 }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    {locale === 'tr' ? 'Tüm Projeler' : locale === 'en' ? 'All Projects' : 'Alle Projekte'}
                </Link>
                <span className={styles.heroBadge}>{overline}</span>
                <h1 className={styles.heroTitle}>{title}</h1>
                <p className={styles.heroDesc}>
                    {locale === 'tr' ? project.shortDescriptionTr : locale === 'en' ? project.shortDescriptionEn : project.shortDescriptionDe}
                </p>
            </div>
        </section>

        {/* Centered Main Image */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', aspectRatio: '16/9' }}>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>

        {/* Centered Content Section */}
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem' }}>
            <div className={styles.textCol}>
                <h2 className={styles.heading} style={{ fontSize: '2.5rem', textAlign: 'center' }}>
                    {locale === 'tr' ? 'Genel Bakış' : locale === 'en' ? 'Overview' : 'Überblick'}
                </h2>
                <div 
                    className={styles.description} 
                    style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}
                    dangerouslySetInnerHTML={{ __html: detailedContent }}
                ></div>

                {/* Features Grid - Centered */}
                <div style={{ marginTop: '5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center', color: 'var(--text-primary)' }}>
                      {locale === 'tr' ? 'Temel Kazanımlar' : locale === 'en' ? 'Key Benefits' : 'Hauptvorteile'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                      {project.features.map(feat => (
                          <div key={feat.id} style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>
                                  {feat.icon || 'verified_user'}
                              </span>
                              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                                  {locale === 'tr' ? feat.titleTr : locale === 'en' ? feat.titleEn : feat.titleDe}
                              </div>
                          </div>
                      ))}
                  </div>
                </div>

                {technicalSpecs && (
                    <div style={{ marginTop: '6rem', padding: '4rem', backgroundColor: '#f8fafc', borderRadius: '3rem', border: '1px solid #e2e8f0' }}>
                        <h3 className={styles.heading} style={{ fontSize: '2rem', marginTop: 0, textAlign: 'center' }}>
                            {locale === 'tr' ? 'Teknik Özellikler' : locale === 'en' ? 'Technical Specifications' : 'Technische Daten'}
                        </h3>
                        <div 
                            style={{ marginTop: '2.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}
                            dangerouslySetInnerHTML={{ __html: technicalSpecs }}
                        ></div>
                    </div>
                )}

                {/* Resource Buttons - Centered */}
                {(project.demoUrl || project.documentUrl) && (
                    <div style={{ marginTop: '6rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" className={styles.btnPrimary} style={{ textDecoration: 'none', width: 'auto', minWidth: '200px', textAlign: 'center' }}>
                                {locale === 'tr' ? 'Ürünü İncele' : 'Try Demo'}
                            </a>
                        )}
                        {project.documentUrl && (
                            <a href={project.documentUrl} target="_blank" className={styles.btnSecondary} style={{ textDecoration: 'none', width: 'auto', minWidth: '200px', textAlign: 'center' }}>
                                {locale === 'tr' ? 'Dokümantasyon' : 'Documentation'}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>

        {/* Final CTA - Centered */}
        <section style={{ backgroundColor: '#135bec08', padding: '10rem 1.5rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h2 className={styles.heading} style={{ marginBottom: '1.5rem' }}>
                    {locale === 'tr' ? 'Bu Teknolojiyle Dönüşüme Başlayın' : 'Ready to Transform?'}
                </h2>
                <p className={styles.description} style={{ marginBottom: '3rem' }}>
                    {locale === 'tr' ? 'Softium altyapısı ile işletmenizi geleceğe taşıyın. Elite mühendislik çözümlerimizle tanışın.' : 'Implementation is the last piece of the puzzle.'}
                </p>
                <Link href={`/${locale}/iletisim`} className={styles.btnPrimary} style={{ textDecoration: 'none', width: 'auto' }}>
                    {locale === 'tr' ? 'Detaylı Bilgi Al' : 'Contact Us'}
                </Link>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

