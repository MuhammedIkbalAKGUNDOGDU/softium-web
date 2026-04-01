import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://softium.tech';
  const locales = ['tr', 'en', 'de'];
  const paths = [
    '',
    '/hizmetler',
    '/hakkimizda',
    '/projeler',
    '/iletisim',
    '/blog',
    '/referanslar',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    paths.forEach((path) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : path.includes('hizmetler') || path.includes('projeler') ? 0.8 : 0.5,
      });
    });
  });

  return sitemapEntries;
}
