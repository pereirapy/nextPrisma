import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { ParamsApp } from '@/types/app';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';
import { parseMetadata } from '@/lib/i18n/settings';
import { getVersions } from '@/lib/services/versions';
import HeaderWithFooter from '@/components/header-with_footer';

import VersionList from './versions-list';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return parseMetadata({
    title: dictionary.versionsPage['metaData.title'],
    description: dictionary.versionsPage['metaData.description'],
    lng,
  });
}

export default async function Home({ params: { lng } }: ParamsApp) {
  const dictionary = await getDictionary(lng);
  const session = await getServerSession(authOptions);

  const { versions, error } = await getVersions();
  const name = session?.user?.name ? `, ${session.user.name}` : '';
  const title = `${dictionary.versionsPage.hello}${name}. ${dictionary.versionsPage.title}`;

  return (
    <HeaderWithFooter
      dictionary={dictionary}
      title={title}
      currentLanguage={lng}>
      <VersionList
        error={error}
        data={versions}
        dictionary={dictionary}
        currentLanguage={lng}
      />
    </HeaderWithFooter>
  );
}
