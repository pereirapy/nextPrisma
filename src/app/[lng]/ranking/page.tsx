import { ParamsApp } from '../../../types/app';
import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import RankingList from './ranking-list';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Metadata } from 'next';
import { getRankings } from '@/lib/services/ranking';

export async function generateMetadata({
	params: { lng },
}: ParamsApp): Promise<Metadata> {
	const dictionary = await getDictionary(lng);

	return {
		title: dictionary.rankingPage['metaData.title'],
		description: dictionary.rankingPage['metaData.description'],
	};
}


export default async function Ranking({
	params: { lng },
}: ParamsApp) {
	const dictionary = await getDictionary(lng);
	const session = await getServerSession(authOptions);
	const currentUser = session?.user

	const { rankings, error } = await getRankings();

	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.rankingPage.title}
			currentLanguage={lng}>
			<RankingList
				currentLanguage={lng}
				dictionary={dictionary}
				data={rankings}
				error={error}
				currentUser={currentUser}
			/>
		</HeaderWithFooter>
	);
}
