import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CALLBACK_URL } from '@/utils/constants';
import { getServerSession } from 'next-auth';

import { ParamsApp } from '@/types/app';
import { routes } from '@/config/routes';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/lib/i18n';
import { getPointsByCoach } from '@/lib/services/points';
import HeaderWithFooter from '@/components/header-with_footer';

import PointList from './point-list';

export async function generateMetadata({
  params: { lng },
}: ParamsApp): Promise<Metadata> {
  const dictionary = await getDictionary(lng);

  return {
    title: dictionary.pointsPage['metaData.title'],
    description: dictionary.pointsPage['metaData.description'],
  };
}

export default async function Points({ params: { lng } }: ParamsApp) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${lng}${routes.signIn}?${CALLBACK_URL}=/${lng}${routes.points}`);
  }
  const dictionary = await getDictionary(lng);
  const { points, error } = await getPointsByCoach(session.user.coachId);
  return (
    <HeaderWithFooter
      dictionary={dictionary}
      title={`${dictionary.pointsPage.title}, ${session.user.name}`}
      currentLanguage={lng}>
      <PointList
        dictionary={dictionary}
        data={points}
        error={error}
      />
    </HeaderWithFooter>
  );
}
