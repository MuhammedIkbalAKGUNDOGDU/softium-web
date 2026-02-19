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

export default function ReferencesPage() {
  const t = useTranslations('references');

  const COMPANIES = [
    { id: 'techcorp', icon: 'account_balance', name: 'Global Tech Corp', industry: 'Fintech' },
    { id: 'nexus', icon: 'monitor_heart', name: 'Nexus Health', industry: 'Healthcare' },
    { id: 'future', icon: 'local_shipping', name: 'Future Logistics', industry: 'Logistics' },
    { id: 'alpha', icon: 'verified_user', name: 'Alpha Systems', industry: 'Defense' },
    { id: 'eco', icon: 'bolt', name: 'EcoGreen Energy', industry: 'Energy' },
    { id: 'urban', icon: 'apartment', name: 'Urban Architects', industry: 'Construction' },
  ] as const;

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
          {COMPANIES.map((company) => (
            <div key={company.id} className={styles.card}>
              <div className={styles.logoArea}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>
                  {company.icon}
                </span>
              </div>
              <h3 className={styles.companyName}>{company.name}</h3>
              <span className={styles.industry}>{company.industry}</span>
              <p className={styles.description}>
                {t(`companies.${company.id}`)}
              </p>
              {/* Optional: Link to case study if available later
              <a href="#" className={styles.link}>
                View Case Study
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </a>
              */}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
