const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const siteConfig = {
  name: 'Elifoot',
  url,
  ogImage: `${url}/og.png`,
  description: 'Creating funny time for all players.',
  links: {
    twitter: 'https://twitter.com/pereirapy',
    github: 'https://github.com/pereirapy/elifoot',
  },
};

export type SiteConfig = typeof siteConfig;
