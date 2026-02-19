import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './projects.module.css';

/* ─── Metadata ────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects.hero' });
  
  return {
    title: `${t('heading')} | Softium Technologies`,
    description: t('subtitle'),
  };
}

/* ─── Page Component ──────────────────────────── */
export default function ProjectsPage() {
  const t = useTranslations('projects');

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

        {/* ── Product 01: Softium Core 2.0 ────────────── */}
        <section className={styles.sectionProduct}>
          <div className={styles.productWrapper}>
            <div className={`${styles.textCol} ${styles.itemOrder2} ${styles.lgOrder1}`}>
              <div>
                <p className={styles.subHeading}>{t('core.overline')}</p>
                <h2 className={styles.heading}>{t('core.heading')}</h2>
                <p className={styles.description}>{t('core.desc')}</p>
              </div>
              
              <ul className={styles.featureList}>
                {['f1', 'f2', 'f3'].map((key) => (
                  <li key={key} className={styles.featureItem}>
                    <span className={`material-symbols-outlined ${styles.featureIcon}`}>check_circle</span>
                    {t(`core.${key}`)}
                  </li>
                ))}
              </ul>
              
              <a href="#" className={styles.productLink}>
                {t('core.cta')}
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward_ios</span>
              </a>
            </div>
            
            <div className={`${styles.itemOrder1} ${styles.lgOrder2}`}>
              <div className={styles.imageContainer}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDRVVPUntu07m1OspSIg0Gdsu9WyQV7x4ljW1tyQUekRqLGUSpHjVEV1crRRunxPx4mXrHekK09Hoh6LDb_PxMKZcuazX6l3egU6hMJKtmROPrZaAl9v77JE-_BzRqQSP5jrtikCF4bekIhPf63KHQiliJ9O9BeSQeEQcZSPk5p74lznydBy_ntNEqW4tweP1CUVUFPBy3TKWbGFeXzXLFpgJUIdM-jaEkfwHsESBMmrIjNlBs-kHUSA4q0b1KcyrbZrfTrZPAU642" 
                  alt={t('core.alt')} 
                  className={styles.productImage}
                  style={{ mixBlendMode: 'multiply', opacity: 0.9 }} 
                />
                <div className={styles.overlayGradient}></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product 02: Nexus Guard ────────────────── */}
        <section className={styles.sectionProduct} style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className={styles.productWrapper}>
            <div>
              <div className={styles.imageContainer} style={{ background: 'white' }}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUwgHu7-PqyaxJX3Oe6n5Hto6iJpKrANZ02ckEYUbysOOcY8mYlOCpJFEooL_2dCoKvYtQ1ug3ZTU3FQQ3ugYR90pwvcI9_yvZ7IkMx_ftaPFGQ0_aEI5NA0Es4h3VAtz_vR4HNy1yzDfXWKbW63OHp6NZqS17eIl8mY1pP6DNXWRC_D04ly-vhmdX86inWEyxRy0KKWz3sdNTFiyl2tMLh8NP7bbVUtGPiZmFLqIV8DmPSzqjxZbF2yJFKuUjmajIjPX_Dtc5GQkg" 
                  alt={t('nexus.alt')} 
                  className={styles.productImage}
                />
                <div className={styles.overlayGradient}></div>
              </div>
            </div>

            <div className={styles.textCol}>
              <div>
                <p className={styles.subHeading}>{t('nexus.overline')}</p>
                <h2 className={styles.heading}>{t('nexus.heading')}</h2>
                <p className={styles.description}>{t('nexus.desc')}</p>
              </div>
              
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>security</span>
                  {t('nexus.f1')}
                </li>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>bolt</span>
                  {t('nexus.f2')}
                </li>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>shield_with_heart</span>
                  {t('nexus.f3')}
                </li>
              </ul>
              
              <a href="#" className={styles.productLink}>
                {t('nexus.cta')}
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward_ios</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Product 03: Vision Analytics ───────────── */}
        <section className={styles.sectionProduct}>
          <div className={styles.productWrapper}>
            <div className={`${styles.textCol} ${styles.itemOrder2} ${styles.lgOrder1}`}>
              <div>
                <p className={styles.subHeading}>{t('vision.overline')}</p>
                <h2 className={styles.heading}>{t('vision.heading')}</h2>
                <p className={styles.description}>{t('vision.desc')}</p>
              </div>
              
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>insights</span>
                  {t('vision.f1')}
                </li>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>visibility</span>
                  {t('vision.f2')}
                </li>
                <li className={styles.featureItem}>
                  <span className={`material-symbols-outlined ${styles.featureIcon}`}>auto_graph</span>
                  {t('vision.f3')}
                </li>
              </ul>
              
              <a href="#" className={styles.productLink}>
                {t('vision.cta')}
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward_ios</span>
              </a>
            </div>
            
            <div className={`${styles.itemOrder1} ${styles.lgOrder2}`}>
              <div className={styles.imageContainer}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMRH_1IFWM1JvWAaseLptk8dk5mQfmSeuf4_8mlRQ9ml2Uv5dcQy78GhC5eK9P7jAaf46jWQKLDjJ8v1YVrYXmqrK_V3ICx2w4VAuuYU6pfu4u1LBns8zO0rEkn2vHM_iFeaKxEQMHWmIgFajJHSsGdjQ2UL2VSKItrwzYzftm015IYMiXpjgzhaza61i56fY0rILxB8J3aGJjAtj18olYuZjNpgY4CSK74uJD1DgMIaROWiGv4wGrg2fvX3IcZr4OubMe3MMr3VeH" 
                  alt={t('vision.alt')} 
                  className={styles.productImage}
                  style={{ mixBlendMode: 'overlay' }}
                />
                <div className={styles.overlayGradient} style={{ background: 'linear-gradient(to top right, white, transparent)', opacity: 0.5 }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product 04: Flow Automate (Dark) ───────── */}
        <section className={styles.darkSection}>
          <div className={styles.darkInner}>
            <div className={styles.productWrapper}>
              <div className={`${styles.itemOrder2} ${styles.lgOrder1}`}>
                <div className={styles.imageContainer} style={{ background: '#1e293b' }}>
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-frTNSZkFg0mubYIYrPovmyvCUVXl_4mbay6y5fOnlJOscCzFSZu1wQFVCog79DOTjP73sMZxKNDu3aUcdSmhMZws2E-F_5QpgP0tu80DCJErblkVkfbg45u4Ji5XWjeVGKLpmIOt0rv8o7eUaRSiWHVVmNCkRyDENKmOhUkzQC0G23_Ys6QLn-S0WqS6WTf1SwNS0npeZ6-yCatVHq0sdiIUMgpayeYy0hDhe0SfvBeSjKmGf8S58FcQ1lolMdBjHiZTIzGIERoo" 
                    alt={t('flow.alt')} 
                    className={styles.productImage}
                    style={{ opacity: 0.8 }}
                  />
                </div>
              </div>

              <div className={`${styles.textCol} ${styles.itemOrder1} ${styles.lgOrder2}`}>
                <div>
                  <p className={styles.subHeading}>{t('flow.overline')}</p>
                  <h2 className={`${styles.heading} ${styles.textWhite}`}>{t('flow.heading')}</h2>
                  <p className={`${styles.description} ${styles.textSlate400}`}>{t('flow.desc')}</p>
                </div>
                
                <ul className={styles.featureList}>
                  <li className={`${styles.featureItem} ${styles.textSlate300}`}>
                    <span className={`material-symbols-outlined ${styles.featureIcon}`}>dynamic_feed</span>
                    {t('flow.f1')}
                  </li>
                  <li className={`${styles.featureItem} ${styles.textSlate300}`}>
                    <span className={`material-symbols-outlined ${styles.featureIcon}`}>sync</span>
                    {t('flow.f2')}
                  </li>
                  <li className={`${styles.featureItem} ${styles.textSlate300}`}>
                    <span className={`material-symbols-outlined ${styles.featureIcon}`}>model_training</span>
                    {t('flow.f3')}
                  </li>
                </ul>
                
                <button className={styles.darkBtn}>
                  {t('flow.cta')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────── */}
        <section className={styles.sectionCTA}>
          <div className={styles.ctaWrapper}>
            <div>
              <h2 className={styles.heading}>{t('cta.heading')}</h2>
              <p className={styles.description}>{t('cta.subheading')}</p>
            </div>
            
            <div className={styles.ctaButtons}>
              <button className={styles.btnPrimary}>{t('cta.primary')}</button>
              <button className={styles.btnSecondary}>{t('cta.secondary')}</button>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
