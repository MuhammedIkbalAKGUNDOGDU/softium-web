'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [nlEmail, setNlEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlMessage, setNlMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:5262/api/sitesettings');
        if (res.ok) {
          const data = await res.json();
          const newSettings: Record<string, string> = {};
          data.forEach((item: any) => {
            newSettings[item.settingKey] = item.settingValue;
          });
          setSettings(newSettings);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    };
    fetchSettings();
  }, []);

  const currentYear = new Date().getFullYear();

  if (pathname.includes('/admin')) return null;

  const solutions = [
    { key: 'aiSystems', href: `/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}#ai` },
    { key: 'cloudInfra', href: `/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}#cloud` },
    { key: 'saas', href: `/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}#saas` },
    { key: 'dataAnalytics', href: `/${locale}${locale === 'tr' ? '/hizmetler' : '/services'}#data` },
  ];

  const company = [
    { key: 'about', href: `/${locale}${locale === 'tr' ? '/hakkimizda' : '/about'}` },
    { key: 'careers', href: `/${locale}/careers` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'press', href: `/${locale}/press` },
  ];

  const legal = [
    { key: 'privacy', href: `/${locale}/privacy` },
    { key: 'terms', href: `/${locale}/terms` },
    { key: 'cookies', href: `/${locale}/cookies` },
  ];

  return (
    <footer className={styles.footer} id="footer" role="contentinfo">
      <div className="container">
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo} aria-label="Softium Technologies homepage">
              <div className={styles.logoIcon} aria-hidden="true">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 1" }}>
                  all_inclusive
                </span>
              </div>
              <span className={styles.logoText}>Softium</span>
            </Link>
            <p className={styles.brandDesc}>{t('description')}</p>

            {/* Contact Info (Dynamic) */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-faint)' }}>
               {settings.Email && (
                 <a href={`mailto:${settings.Email}`} style={{textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span>
                    {settings.Email}
                 </a>
               )}
               {settings.Phone && (
                 <a href={`tel:${settings.Phone}`} style={{textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>call</span>
                    {settings.Phone}
                 </a>
               )}
               {settings.Address && (
                 <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>location_on</span>
                    {settings.Address}
                 </div>
               )}
            </div>

            {/* Social Links (Dynamic) */}
            <div className={styles.socials} aria-label="Social media links">
              {settings.Twitter && (
                <a
                  href={settings.Twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="footer-twitter"
                  aria-label="Softium on Twitter"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
              {settings.LinkedIn && (
                <a
                  href={settings.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="footer-linkedin"
                  aria-label="Softium on LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {settings.GitHub && (
                <a
                  href={settings.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="footer-github"
                  aria-label="Softium on GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {settings.Instagram && (
                <a
                  href={settings.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="footer-instagram"
                  aria-label="Softium on Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Quick Newsletter */}
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bültenimize Abone Olun</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sektörel haberler ve güncellemelerden haberdar olun.</p>
              <form 
                style={{ display: 'flex', gap: '0.5rem' }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if(!nlEmail) return;
                  setNlLoading(true);
                  try {
                    const res = await fetch('http://localhost:5262/api/newsletter/subscribe', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ email: nlEmail })
                    });
                    if (res.ok) {
                      setNlMessage(locale === 'tr' ? 'Bültene başarıyla abone oldunuz!' : 'Successfully subscribed!');
                      setNlEmail('');
                    } else {
                      setNlMessage(locale === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.');
                    }
                  } catch (e) {
                     setNlMessage(locale === 'tr' ? 'Bağlantı hatası!' : 'Connection error!');
                  } finally {
                     setNlLoading(false);
                     setTimeout(() => setNlMessage(''), 5000);
                  }
                }}
              >
                <input 
                  type="email" 
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  placeholder="hello@company.com" 
                  disabled={nlLoading}
                  style={{ 
                    flex: 1, 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border-light)', 
                    background: 'var(--bg)', 
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)' 
                  }} 
                  required
                />
                <button 
                  type="submit" 
                  disabled={nlLoading}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.8125rem', 
                    fontWeight: 600, 
                    cursor: 'pointer' 
                  }}
                >
                  {nlLoading ? '...' : (locale === 'tr' ? 'Katıl' : 'Join')}
                </button>
              </form>
              {nlMessage && <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)' }}>{nlMessage}</div>}
            </div>

          </div>

          {/* Links */}
          <nav className={styles.links} aria-label="Footer navigation">
            <div className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{t('solutions')}</h3>
              <ul role="list">
                {solutions.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className={styles.footerLink}>
                      {t(`links.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{t('company')}</h3>
              <ul role="list">
                {company.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className={styles.footerLink}>
                      {t(`links.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{t('legal')}</h3>
              <ul role="list">
                {legal.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} className={styles.footerLink}>
                      {t(`links.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('copyright').replace('2025', currentYear.toString())}
          </p>
          <div className={styles.bottomRight}>
            <div className={styles.statusBadge} id="footer-status">
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusDotPing} aria-hidden="true" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
