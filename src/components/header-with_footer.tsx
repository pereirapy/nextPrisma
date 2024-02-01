import { ReactNode } from 'react';

import { Dictionary } from '@/types/app';
import { Locale } from '@/lib/i18n/settings';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import { H1 } from './ui/typographies';

export default function HeaderWithFooter({
  currentLanguage,
  dictionary,
  children,
  title,
}: {
  dictionary: Dictionary;
  currentLanguage: Locale;
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="container">
      <SiteHeader
        dictionary={dictionary}
        currentLanguage={currentLanguage}
      />
      <div className="my-4 min-h-[400px]">
        {title && <H1 className="py-16 text-center">{title}</H1>}
        {children}
      </div>
      <SiteFooter dictionary={dictionary} />
    </div>
  );
}
