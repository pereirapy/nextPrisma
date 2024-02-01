import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';
import { getDictionary } from '@/lib/i18n';
import { parseMetadata } from '@/lib/i18n/settings';
import HeaderWithFooter from '@/components/header-with_footer';

import { UserAuthContainer } from './components/user-auth-container';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return parseMetadata({
    title: dictionary.pointsPage['metaData.title'],
    description: dictionary.pointsPage['metaData.description'],
    lng,
  });
}

export default async function AuthenticationPage({
  params: { lng },
}: ParamsApp) {
  const dictionary = await getDictionary(lng);

  return (
    <HeaderWithFooter
      dictionary={dictionary}
      title={dictionary.login['page.title']}
      currentLanguage={lng}>
      <UserAuthContainer
        currentLanguage={lng}
        dictionary={dictionary}
      />
    </HeaderWithFooter>
  );
}
