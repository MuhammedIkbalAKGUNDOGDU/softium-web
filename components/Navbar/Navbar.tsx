'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { key: 'services', href: '/hizmetler' },
  { key: 'projects', href: '/projeler' },
  { key: 'about', href: '/hakkimizda' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/iletisim' },
] as const;

const EN_NAV_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

const DE_NAV_LINKS = [
  { key: 'services', href: '/leistungen' },
  { key: 'projects', href: '/projekte' },
  { key: 'about', href: '/ueber-uns' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/kontakt' },
] as const;

const LOCALES = [
  { code: 'tr', flag: '🇹🇷', label: 'TR', name: 'Türkçe' },
  { code: 'en', flag: '🇬🇧', label: 'EN', name: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'DE', name: 'Deutsch' },
] as const;

type LinkList = typeof NAV_LINKS | typeof EN_NAV_LINKS | typeof DE_NAV_LINKS;

function getLinks(locale: string): LinkList {
  if (locale === 'en') return EN_NAV_LINKS;
  if (locale === 'de') return DE_NAV_LINKS;
  return NAV_LINKS;
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const langMenuRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [langOpen, setLangOpen] = useState(false);

  const links = getLinks(locale);
  const currentLang = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

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

  // Close language dropdown when clicking outside
  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  const switchLocale = useCallback((newLocale: string) => {
    setLangOpen(false);
    setMobileOpen(false);
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  }, [locale, pathname, router]);

  const getHref = (href: string) => `/${locale}${href}`;

  const contactHref = getHref(locale === 'tr' ? '/iletisim' : locale === 'de' ? '/kontakt' : '/contact');

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
            {/* Language Dropdown */}
            <div ref={langMenuRef} className={styles.langWrapper}>
              <button
                id="lang-toggle-btn"
                className={styles.langToggle}
                onClick={() => setLangOpen((p) => !p)}
                aria-label="Select language"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span className={styles.langFlag}>{currentLang.flag}</span>
                <span className={styles.langLabel}>{currentLang.label}</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '14px', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>

              {/* Dropdown */}
              {langOpen && (
                <div className={styles.langDropdown} role="listbox" aria-label="Language options">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      id={`lang-option-${loc.code}`}
                      role="option"
                      aria-selected={locale === loc.code}
                      className={`${styles.langOption} ${locale === loc.code ? styles.langOptionActive : ''}`}
                      onClick={() => switchLocale(loc.code)}
                    >
                      <span>{loc.flag}</span>
                      <span className={styles.langOptionName}>{loc.name}</span>
                      {locale === loc.code && (
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', marginLeft: 'auto', color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
              href={contactHref}
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
              {/* Mobile Language Switcher */}
              <div className={styles.mobileLangRow}>
                {LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    id={`mobile-lang-${loc.code}`}
                    className={`${styles.mobileLangChip} ${locale === loc.code ? styles.mobileLangChipActive : ''}`}
                    onClick={() => switchLocale(loc.code)}
                  >
                    {loc.flag} {loc.label}
                  </button>
                ))}
              </div>
              <Link
                href={contactHref}
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
