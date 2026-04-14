'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { key: 'services', href: '/hizmetler' },
  { key: 'projects', href: '/projeler' },
  { key: 'references', href: '/referanslar' },
  { key: 'about', href: '/hakkimizda' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/iletisim' },
] as const;

const EN_NAV_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'projects', href: '/projects' },
  { key: 'references', href: '/references' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

const DE_NAV_LINKS = [
  { key: 'services', href: '/leistungen' },
  { key: 'projects', href: '/projekte' },
  { key: 'references', href: '/referenzen' },
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

const SOCIALS = [
  {
    key: 'LinkedIn',
    label: 'LinkedIn',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  },
  {
    key: 'Twitter',
    label: 'Twitter / X',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>,
  },
  {
    key: 'Instagram',
    label: 'Instagram',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    key: 'GitHub',
    label: 'GitHub',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
];

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
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sitesettings`)
      .then((r) => r.ok ? r.json() : [])
      .then((data: any[]) => {
        const map: Record<string, string> = {};
        data.forEach((item) => { map[item.settingKey] = item.settingValue; });
        setSiteSettings(map);
      })
      .catch(() => {});
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

  if (pathname.includes('/admin')) return null;

  const activeSocials = SOCIALS.filter((s) => siteSettings[s.key]);

  return (
    <>
      {/* Slim social top bar */}
      {activeSocials.length > 0 && (
        <div className={styles.topbar}>
          <div className={styles.topbarInner}>
            <span className={styles.topbarBrand}>
              <span className={styles.topbarDot} />
              Softium Technologies
            </span>
            <div className={styles.topbarSocials}>
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={siteSettings[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.topbarSocialLink}
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav" aria-label="Main navigation">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo} aria-label="Softium Technologies - Ana Sayfa">
            <img 
              src={theme === 'dark' ? '/logo_arkaplansız_beyaz.png' : '/logo_arkaplansız_siyah.png'} 
              alt="Softium Logo" 
              style={{ height: '120px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopLinks} role="menubar">
            {links.map((link) => {
              const fullHref = getHref(link.href);
              const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
              
              // No special on-page scroll links for home for now
              const isSectionLinkOnHome = false;
              const href = (isHome && isSectionLinkOnHome) ? `#${link.key}` : fullHref;

              const isActive = pathname === fullHref || (isHome && isSectionLinkOnHome && pathname.includes(`#${link.key}`));

              return (
                <Link
                  key={link.key}
                  href={href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(link.key)}
                </Link>
              );
            })}
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
            {links.map((link, i) => {
              const fullHref = getHref(link.href);
              const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
              const isSectionLink = false;
              const href = (isHome && isSectionLink) ? `#${link.key}` : fullHref;
              const isActive = pathname === fullHref;
              
              return (
                <Link
                  key={link.key}
                  href={href}
                  className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${i * 0.05}s` }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(link.key)}
                </Link>
              );
            })}
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
