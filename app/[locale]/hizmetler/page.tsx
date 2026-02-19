import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CTASection from '@/components/CTASection/CTASection';
import Image from 'next/image';
import styles from './services.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.services' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

const SERVICES_DETAIL = [
  {
    id: 'ai',
    icon: 'psychology',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.08)',
    features: [
      'Machine Learning Model Development',
      'Natural Language Processing (NLP)',
      'Computer Vision Solutions',
      'Predictive Analytics Engines',
      'AI-Powered Automation Workflows',
      'Real-time Decision Systems',
    ],
    featuresTr: [
      'Makine Öğrenmesi Model Geliştirme',
      'Doğal Dil İşleme (NLP)',
      'Bilgisayarlı Görü Çözümleri',
      'Tahminsel Analitik Motorları',
      'Yapay Zeka Destekli Otomasyon',
      'Gerçek Zamanlı Karar Sistemleri',
    ],
  },
  {
    id: 'cloud',
    icon: 'cloud_done',
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.08)',
    features: [
      'AWS / GCP / Azure Architecture',
      'Kubernetes & Container Orchestration',
      'CloudNative Migration Strategy',
      'Multi-Cloud & Hybrid Solutions',
      'Auto-Scaling Infrastructure',
      '99.99% SLA Guarantee',
    ],
    featuresTr: [
      'AWS / GCP / Azure Mimarisi',
      'Kubernetes ve Container Yönetimi',
      'Cloud-Native Migrasyon Stratejisi',
      'Multi-Cloud ve Hibrit Çözümler',
      'Otomatik Ölçeklenen Altyapı',
      '%99.99 SLA Garantisi',
    ],
  },
  {
    id: 'saas',
    icon: 'deployed_code',
    color: '#135bec',
    bgColor: 'rgba(19, 91, 236, 0.08)',
    features: [
      'Custom SaaS Product Development',
      'Multi-Tenant Architecture',
      'Subscription Billing Systems',
      'API-First Design',
      'White-Label Solutions',
      'Product Analytics Integration',
    ],
    featuresTr: [
      'Özel SaaS Ürün Geliştirme',
      'Multi-Tenant Mimari',
      'Abonelik Faturalandırma Sistemleri',
      'API-First Tasarım',
      'Beyaz Etiket Çözümler',
      'Ürün Analitik Entegrasyonu',
    ],
  },
  {
    id: 'data',
    icon: 'monitoring',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    features: [
      'Real-Time Data Pipelines',
      'Business Intelligence Dashboards',
      'Data Warehouse Architecture',
      'ETL / ELT Solutions',
      'Predictive Modeling',
      'Big Data Processing',
    ],
    featuresTr: [
      'Gerçek Zamanlı Veri Pipeline\'ları',
      'İş Zekası Gösterge Panelleri',
      'Veri Ambarı Mimarisi',
      'ETL / ELT Çözümleri',
      'Tahminsel Modelleme',
      'Büyük Veri İşleme',
    ],
  },
  {
    id: 'marketing',
    icon: 'rocket_launch',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.08)',
    features: [
      'Technical SEO & Core Web Vitals',
      'Programmatic Advertising',
      'Marketing Automation',
      'Conversion Rate Optimization',
      'Growth Hacking Strategies',
      'Analytics & Attribution Modeling',
    ],
    featuresTr: [
      'Teknik SEO ve Core Web Vitals',
      'Programatik Reklamcılık',
      'Pazarlama Otomasyonu',
      'Dönüşüm Oranı Optimizasyonu',
      'Growth Hacking Stratejileri',
      'Analitik ve Attribution Modelleme',
    ],
  },
  {
    id: 'devops',
    icon: 'settings_suggest',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.08)',
    features: [
      'CI/CD Pipeline Design',
      'Infrastructure as Code (IaC)',
      'GitOps Workflows',
      'Security & Compliance Automation',
      'Monitoring & Alerting',
      'Incident Response Systems',
    ],
    featuresTr: [
      'CI/CD Pipeline Tasarımı',
      'Kod Olarak Altyapı (IaC)',
      'GitOps İş Akışları',
      'Güvenlik ve Uyumluluk Otomasyonu',
      'İzleme ve Uyarı Sistemleri',
      'Olay Müdahale Sistemleri',
    ],
  },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className={styles.pageHero} aria-labelledby="services-page-title">
          <div className={styles.heroGradient} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroContent}>
              <div className="badge">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>grid_view</span>
                {t('badge')}
              </div>
              <h1 className={styles.heroTitle} id="services-page-title">
                {t('title')}
              </h1>
              <p className={styles.heroSubtitle}>{t('subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className={styles.servicesSection} id="services-list">
          <div className="container">
            <div className={styles.servicesList}>
              {SERVICES_DETAIL.map((service, index) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={`${styles.serviceItem} ${index % 2 === 1 ? styles.reversed : ''}`}
                  aria-labelledby={`service-title-${service.id}`}
                >
                  {/* Content */}
                  <div className={styles.serviceContent}>
                    <div
                      className={styles.serviceIcon}
                      style={{ background: service.bgColor, color: service.color }}
                      aria-hidden="true"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '2rem', fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                      >
                        {service.icon}
                      </span>
                    </div>
                    <h2
                      className={styles.serviceTitle}
                      id={`service-title-${service.id}`}
                      style={{ color: service.color }}
                    >
                      {t(`items.${service.id}.title`)}
                    </h2>
                    <p className={styles.serviceDesc}>
                      {t(`items.${service.id}.description`)}
                    </p>

                    {/* Features List */}
                    <ul className={styles.featureList} role="list" aria-label={`Features of ${t(`items.${service.id}.title`)}`}>
                      {(locale === 'tr' ? service.featuresTr : service.features).map((feat, i) => (
                        <li key={i} className={styles.featureItem}>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '1.125rem', color: service.color, fontVariationSettings: "'FILL' 1" }}
                            aria-hidden="true"
                          >
                            check_circle
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/${locale}${locale === 'tr' ? '/iletisim' : '/contact'}?service=${service.id}`}
                      className={styles.serviceBtn}
                      id={`service-cta-${service.id}`}
                      style={{
                        background: service.color,
                        boxShadow: `0 8px 24px ${service.color}33`,
                      }}
                    >
                      {locale === 'tr' ? 'Bu Hizmeti İste' : 'Request This Service'}
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                    </a>
                  </div>

                  {/* Visual */}
                  <div className={styles.serviceVisual}>
                    <div
                      className={styles.visualCard}
                      style={{ borderColor: `${service.color}20` }}
                    >
                      {index === 0 && (
                        <Image
                          src="/dashboard-mockup.png"
                          alt="AI Analytics Dashboard mockup"
                          width={560}
                          height={380}
                          className={styles.visualImg}
                        />
                      )}
                      {index === 1 && (
                        <Image
                          src="/hero-sphere.png"
                          alt="Cloud Infrastructure visualization"
                          width={560}
                          height={380}
                          className={styles.visualImg}
                          style={{ padding: '2rem', objectFit: 'contain' }}
                        />
                      )}
                      {index === 2 && (
                        <Image
                          src="/mobile-mockup.png"
                          alt="Mobile SaaS App mockup"
                          width={560}
                          height={380}
                          className={styles.visualImg}
                          style={{ objectFit: 'contain', padding: '2rem' }}
                        />
                      )}
                      {index > 2 && (
                        <div className={styles.visualPlaceholder} style={{ background: service.bgColor }}>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '5rem', color: service.color, opacity: 0.3, fontVariationSettings: "'FILL' 0, 'wght' 100" }}
                          >
                            {service.icon}
                          </span>
                          <div className={styles.visualLabel} style={{ color: service.color }}>
                            {t(`items.${service.id}.title`)}
                          </div>
                        </div>
                      )}
                      {/* Overlay chip */}
                      <div className={styles.visualChip} style={{ borderColor: `${service.color}20` }}>
                        <div className={styles.chipDot} style={{ background: service.color }} />
                        <span className={styles.chipText} style={{ color: service.color }}>
                          {service.id.toUpperCase()} READY
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
