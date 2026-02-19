'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { key: 'solutions', href: '/#services' },
  { key: 'services', href: '/hizmetler' },
  { key: 'projects', href: '/projeler' },
  { key: 'about', href: '/hakkimizda' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/iletisim' },
] as const;

const EN_NAV_LINKS = [
  { key: 'solutions', href: '/#services' },
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const links = locale === 'tr' ? NAV_LINKS : EN_NAV_LINKS;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    // Simple locale switch: replace locale prefix in path
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  }, [locale, pathname, router]);

  const getHref = (href: string) => `/${locale}${href}`;

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav" aria-label="Main navigation">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo} aria-label="Softium Technologies - Ana Sayfa">
            <div className={styles.logoIcon} aria-hidden="true">
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <span className={styles.logoText}>Softium</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopLinks} role="menubar">
            {links.map((link) => (
              <Link
                key={link.key}
                href={getHref(link.href)}
                className={styles.navLink}
                role="menuitem"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Language Toggle */}
            <button
              id="lang-toggle-btn"
              className={styles.langToggle}
              onClick={toggleLocale}
              aria-label={`Switch to ${locale === 'tr' ? 'English' : 'Türkçe'}`}
              title={`Switch to ${locale === 'tr' ? 'English' : 'Türkçe'}`}
            >
              <span className={styles.langFlag}>{locale === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
              <span className={styles.langLabel}>{locale === 'tr' ? 'TR' : 'EN'}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>unfold_more</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* CTA Button */}
            <Link
              id="nav-cta-btn"
              href={getHref(locale === 'tr' ? '/iletisim' : '/contact')}
              className={styles.ctaBtn}
            >
              {t('getStarted')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`} id="mobile-menu" aria-hidden={!mobileOpen}>
          <div className={styles.mobileLinksWrapper}>
            {links.map((link, i) => (
              <Link
                key={link.key}
                href={getHref(link.href)}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className={styles.mobileDivider} />
            <div className={styles.mobileActions}>
              <button className={styles.mobileLangBtn} onClick={() => { toggleLocale(); setMobileOpen(false); }}>
                <span>{locale === 'tr' ? '🇬🇧 Switch to English' : '🇹🇷 Türkçeye Geç'}</span>
              </button>
              <Link
                href={getHref(locale === 'tr' ? '/iletisim' : '/contact')}
                className={styles.mobileCtaBtn}
                onClick={() => setMobileOpen(false)}
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
