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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sitesettings`);
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

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme as 'light' | 'dark');
    };

    handleThemeChange(); // Initial check

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  if (pathname.includes('/admin')) return null;

  const company = [
    { key: 'about', href: `/${locale}${locale === 'tr' ? '/hakkimizda' : '/about'}` },
    { key: 'blog', href: `/${locale}/blog` },
    { key: 'references', href: `/${locale}${locale === 'tr' ? '/referanslar' : '/references'}` },
  ];

  const legal = [
    { key: 'privacy', href: `/${locale}/privacy` },
    { key: 'terms', href: `/${locale}/terms` },
    { key: 'cookies', href: `/${locale}/cookies` },
  ];

  return (
    <footer className={styles.footer} id="footer" role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          {/* Main Links Area */}
          <nav className={styles.links} aria-label="Footer navigation">
            {/* Company Links */}
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

            {/* Legal Links */}
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

            {/* Newsletter Section */}
            <div className={styles.linkGroup}>
              <h3 className={styles.groupTitle}>{t('newsletterTitle')}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {t('newsletterDesc')}
              </p>
              <form 
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if(!nlEmail) return;
                  setNlLoading(true);
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`, {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ email: nlEmail })
                    });
                    if (res.ok) {
                      setNlMessage(t('success'));
                      setNlEmail('');
                    } else if (res.status === 409) {
                      setNlMessage(t('alreadySubscribed'));
                    } else {
                      setNlMessage(t('error'));
                    }
                  } catch (e) {
                     setNlMessage(t('networkError'));
                  } finally {
                     setNlLoading(false);
                     setTimeout(() => setNlMessage(''), 6000);
                  }
                }}
              >
                <input 
                  type="email" 
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')} 
                  disabled={nlLoading}
                  style={{ 
                    padding: '0.625rem 0.875rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border)', 
                    background: 'var(--bg)', 
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)',
                    width: '100%'
                  }} 
                  required
                />
                <button 
                  type="submit" 
                  disabled={nlLoading}
                  style={{ 
                    padding: '0.625rem', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.8125rem', 
                    fontWeight: 700, 
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                >
                  {nlLoading ? '...' : t('subscribe')}
                </button>
              </form>
              {nlMessage && <div style={{ fontSize: '0.75rem', color: 'var(--primary)', lineHeight: '1.4', marginTop: '0.5rem' }}>{nlMessage}</div>}
            </div>
          </nav>

          {/* Brand/Contact Info - Desktop side, Mobile bottom */}
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo} aria-label="Softium Technologies homepage">
              <img 
                src={theme === 'dark' ? '/logo_arkaplansız_beyaz.png' : '/logo_arkaplansız_siyah.png'} 
                alt="Softium Logo" 
                style={{ height: '72px', width: 'auto', objectFit: 'contain' }} 
              />
            </Link>
            <p className={styles.brandDesc}>{t('description')}</p>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-faint)' }}>
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

            <div className={styles.socials} aria-label="Social media links" style={{ marginTop: '1.5rem' }}>
              {settings.Twitter && (
                <a href={settings.Twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              )}
              {settings.LinkedIn && (
                <a href={settings.LinkedIn} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              )}
               {settings.GitHub && (
                <a href={settings.GitHub} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                </a>
              )}
            </div>
          </div>
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
              <span>{t('systemStatus')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
