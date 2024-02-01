import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pt'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export function parseMetadata({
  title,
  description,
  metadataBaseUrl,
  lng,
}: {
  title: string;
  description: string;
  metadataBaseUrl?: string;
  lng: Locale;
}): Metadata {
  const url = metadataBaseUrl || siteConfig.url;
  return {
    metadataBase: new URL(url),
    title,
    description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: `${url}/og.png`, // Must be an absolute URL
          width: 512,
          height: 512,
        },
      ],
      locale: lng,
      type: 'website',
    },
  };
}
