import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';
import { Params } from '@/types/tgver07';
import { getDictionary } from '@/lib/i18n';
import { parseMetadata } from '@/lib/i18n/settings';
import { getVersion } from '@/lib/services/versions';
import HeaderWithFooter from '@/components/header-with_footer';

import VersionToBuy from './version-to-buy';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return parseMetadata({
    title: dictionary.buyPage['metaData.title'],
    description: dictionary.buyPage['metaData.description'],
    lng,
  });
}

export default async function BuyPage({ params: { lng, code } }: Params) {
  const dictionary = await getDictionary(lng);
  const { version, error } = await getVersion(code);

  return (
    <HeaderWithFooter
      dictionary={dictionary}
      currentLanguage={lng}
      title={dictionary.buyPage.title}>
      <VersionToBuy
        dictionary={dictionary}
        data={version}
        error={error}
      />
    </HeaderWithFooter>
  );
}
