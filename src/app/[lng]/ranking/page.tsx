import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { ParamsApp } from '@/types/app';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';
import { parseMetadata } from '@/lib/i18n/settings';
import { getRankings } from '@/lib/services/ranking';
import HeaderWithFooter from '@/components/header-with_footer';

import RankingList from './ranking-list';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return parseMetadata({
    title: dictionary.rankingPage['metaData.title'],
    description: dictionary.rankingPage['metaData.description'],
    lng,
  });
}

export default async function Ranking({ params: { lng } }: ParamsApp) {
  const dictionary = await getDictionary(lng);
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  const { rankings, error } = await getRankings();

  return (
    <HeaderWithFooter
      dictionary={dictionary}
      title={dictionary.rankingPage.title}
      currentLanguage={lng}>
      <RankingList
        dictionary={dictionary}
        data={rankings}
        error={error}
        currentUser={currentUser}
      />
    </HeaderWithFooter>
  );
}
