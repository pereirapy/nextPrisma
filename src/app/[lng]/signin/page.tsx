import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';
import { getDictionary } from '@/lib/i18n';
import HeaderWithFooter from '@/components/header-with_footer';

import { UserAuthContainer } from './components/user-auth-container';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return {
    title: dictionary.login['metaData.title'],
    description: dictionary.login['metaData.description'],
  };
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
