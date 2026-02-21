import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './references.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'references.hero' });

  return {
    title: `${t('heading')} | Softium Technologies`,
    description: t('subtitle'),
  };
}

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'references' });

  let COMPANIES: any[] = [];
  try {
    const res = await fetch('http://localhost:5262/api/references', { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      COMPANIES = data.filter((company: any) => company.isActive);
    }
  } catch (error) {
    console.error("Geliştirici Notu: Backend bağlantısı kurulamadı. Veritabanı verileri çekilemedi.", error);
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.badge}>{t('hero.badge')}</div>
        <h1 className={styles.heading}>{t('hero.heading')}</h1>
        <p className={styles.subtitle}>{t('hero.subtitle')}</p>
      </section>

      {/* Grid Section */}
      <section className={styles.gridContainer} style={{ flex: 1 }}>
        <div className={styles.grid}>
          {COMPANIES.length > 0 ? (
            COMPANIES.map((company) => (
              <div key={company.id} className={styles.card}>
                <div className={styles.logoArea}>
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>
                      {company.icon || 'corporate_fare'}
                    </span>
                  )}
                </div>
                <h3 className={styles.companyName}>{company.name}</h3>
                <span className={styles.industry}>{company.industry}</span>
                <p className={styles.description}>
                  {/* Backend'den gelen verida aciklama henuz yok, o yuzden dilden veya varsayılan bir yazi kullanilabilir. */}
                  {t.has(`companies.${company.name}`) ? t(`companies.${company.name}`) : 'Değerli iş ortaklarımızdan biri olan ' + company.name + ' ile birlikte sektörde yenilikçi adımlar atıyoruz.'}
                </p>
                {company.websiteUrl && (
                  <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                    Websiteyi Ziyaret Et
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>open_in_new</span>
                  </a>
                )}
              </div>
            ))
          ) : (
             <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem', color: 'var(--text-muted)' }}>
               {t.has('empty') ? t('empty') : 'Şu an aktif referans bulunmamaktadır.'}
             </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
