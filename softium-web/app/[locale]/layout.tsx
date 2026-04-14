import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';
import { Manrope } from 'next/font/google';
import { ScrollProgress } from '@/components/ScrollProgress/ScrollProgress';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://softiumtechnologies.net'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr-TR': '/tr',
        'en-US': '/en',
        'de-DE': '/de',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: [
        { url: '/favicon.png?v=1' },
        { url: '/favicon.png?v=1', type: 'image/png', sizes: '32x32' },
      ],
      apple: [
        { url: '/apple-touch-icon.png?v=1' },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'tr' | 'en' | 'de')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#135bec" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'Softium Technologies',
              'url': 'https://softiumtechnologies.net',
              'logo': 'https://softiumtechnologies.net/logo.png',
              'sameAs': [
                'https://linkedin.com/company/softium',
                'https://twitter.com/softium',
                'https://instagram.com/softium'
              ],
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+90 535 824 99 94',
                'contactType': 'customer service'
              }
            })
          }}
        />
      </head>
      <body className={manrope.variable}>
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

