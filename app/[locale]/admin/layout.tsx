'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
    { name: 'Dashboard', href: `/${locale}/admin`, icon: 'dashboard' },
    { name: 'Referanslar', href: `/${locale}/admin/references`, icon: 'account_balance' },
    { name: 'Blog Yönetimi', href: `/${locale}/admin/blog`, icon: 'article' },
    { name: 'İletişim Talepleri', href: `/${locale}/admin/contact`, icon: 'mail' },
    { name: 'Genel Ayarlar', href: `/${locale}/admin/settings`, icon: 'settings' },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          Softium Admin
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            // Check exact match for Dashboard, prefix match for others to keep them active on subpages
            const isActive = item.href === `/${locale}/admin` 
                             ? pathname === item.href 
                             : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={styles.navLink}
                data-active={isActive ? "true" : "false"}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarUser}>
            <span>Admin</span>
            <div className={styles.avatar}>
              <span className="material-symbols-outlined">person</span>
            </div>
            {/* Softium sitesine dönüş butonu */}
            <Link 
              href={`/${locale}`} 
              className={styles.buttonOutline} 
              style={{ marginLeft: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              Siteye Dön
            </Link>
          </div>
        </header>

        {/* Content View */}
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
