'use client';

import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './projects.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  mainImage: string;
  hoverImage?: string;
  icon?: string;
  isDarkTheme: boolean;
  layout: string;
  sortOrder: number;
  features: ProjectFeature[];
}

export default function ProjectsPage() {
  const locale = useLocale();
  const t = useTranslations('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (e) {
        console.error('Projects fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      
      <main>
        {/* ── Hero Section ────────────────────────────── */}
        <section className={styles.sectionHero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>{t('hero.badge')}</span>
            <h1 className={styles.heroTitle}>{t('hero.heading')}</h1>
            <p className={styles.heroDesc}>{t('hero.subtitle')}</p>
            
            <button className={styles.button}>
              {t('hero.cta')}
              <span className={`material-symbols-outlined ${styles.iconTransition}`}>arrow_forward</span>
            </button>
          </div>
          
          <div className={styles.scrollIndicator} aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* ── Dynamic Product Sections ─────────────────── */}
        {loading ? (
          <div style={{ padding: '8rem 2rem', textAlign: 'center', background: 'var(--bg-primary)' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Projeler yükleniyor...</p>
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '8rem 2rem', textAlign: 'center', background: 'var(--bg-primary)' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Henüz yayınlanmış proje bulunamadı.</p>
          </div>
        ) : (
          projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectTitle = locale === 'tr' ? project.titleTr : locale === 'en' ? project.titleEn : project.titleDe;
            const projectOverline = locale === 'tr' ? project.overlineTr : locale === 'en' ? project.overlineEn : project.overlineDe;
            const projectShortDesc = locale === 'tr' ? project.shortDescriptionTr : locale === 'en' ? project.shortDescriptionEn : project.shortDescriptionDe;
            
            // Port and URL resolution
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5262';
            const imageUrl = (project.mainImage && project.mainImage.startsWith('/uploads/')) 
                ? `${apiUrl}${project.mainImage}` 
                : (project.mainImage || '');

            // ── Split Layout Logic ────────────────────────
            if (project.layout === 'split') {
               return (
                  <section key={project.id} className={styles.sectionSplit}>
                    <div className={styles.splitWrapper}>
                       <div className={styles.splitImageCol}>
                          <img src={imageUrl} alt={projectTitle} className={styles.splitImage} />
                       </div>
                       <div className={styles.splitTextCol}>
                          <span className={styles.subHeading}>{projectOverline}</span>
                          <h2 className={styles.heading}>{projectTitle}</h2>
                          <p className={styles.description}>{projectShortDesc}</p>
                          <Link href={`/${locale}/projects/${project.slug}`} className={styles.productLink}>
                              {t('core.cta')}
                              <span className="material-symbols-outlined">arrow_forward</span>
                          </Link>
                       </div>
                    </div>
                  </section>
               );
            }

            // ── Standard Layout ──────────────────────────
            return (
                <section 
                    key={project.id} 
                    className={project.isDarkTheme ? styles.darkSection : styles.sectionProduct}
                    style={!project.isDarkTheme ? { backgroundColor: index % 2 !== 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)' } : {}}
                >
                  <div className={project.isDarkTheme ? styles.darkInner : ''}>
                    <div className={styles.productWrapper}>
                        {/* Text Content */}
                        <div className={`${styles.textCol} ${isEven ? (project.isDarkTheme ? styles.itemOrder1 : styles.itemOrder2) : styles.itemOrder2} ${isEven ? (project.isDarkTheme ? styles.lgOrder2 : styles.lgOrder1) : styles.lgOrder1}`}>
                            <div>
                                <p className={styles.subHeading}>{projectOverline}</p>
                                <h2 className={`${styles.heading} ${project.isDarkTheme ? styles.textWhite : ''}`}>{projectTitle}</h2>
                                <p className={`${styles.description} ${project.isDarkTheme ? styles.textSlate400 : ''}`}>{projectShortDesc}</p>
                            </div>
                            
                            <ul className={styles.featureList}>
                                {(project as any).features?.map((feat: any) => (
                                  <li key={feat.id} className={`${styles.featureItem} ${project.isDarkTheme ? styles.textSlate300 : ''}`}>
                                      <span className={`material-symbols-outlined ${styles.featureIcon}`}>{feat.icon || 'check_circle'}</span>
                                      {locale === 'tr' ? feat.titleTr : locale === 'en' ? feat.titleEn : feat.titleDe}
                                  </li>
                                ))}
                            </ul>
                            
                            <Link href={`/${locale}/projects/${project.slug}`} className={`${styles.productLink} ${project.isDarkTheme ? styles.textWhite : ''}`}>
                                {t('core.cta')}
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward_ios</span>
                            </Link>
                        </div>
                        
                        {/* Image Content */}
                        <div className={`${isEven ? (project.isDarkTheme ? styles.itemOrder2 : styles.itemOrder1) : styles.itemOrder1} ${isEven ? (project.isDarkTheme ? styles.lgOrder1 : styles.lgOrder2) : styles.lgOrder2}`}>
                            <div className={styles.imageContainer}>
                                <img 
                                    src={imageUrl} 
                                    alt={projectTitle} 
                                    className={styles.productImage}
                                    style={project.isDarkTheme ? { opacity: 0.9 } : { opacity: 1 }} 
                                />
                                <div className={styles.overlayGradient}></div>
                            </div>
                        </div>
                    </div>
                  </div>
                </section>
            );
          })
        )}

        {/* ── CTA Section ────────────────────────────── */}
        <section className={styles.sectionCTA}>
          <div className={styles.ctaWrapper}>
            <div>
              <h2 className={styles.heading}>{t('cta.heading')}</h2>
              <p className={styles.description}>{t('cta.subheading')}</p>
            </div>
            
            <div className={styles.ctaButtons}>
              <Link href={`/${locale}/iletisim`} className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
                {t('cta.primary')}
              </Link>
              <button className={styles.btnSecondary}>{t('cta.secondary')}</button>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}

