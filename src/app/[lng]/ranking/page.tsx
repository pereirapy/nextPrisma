import Link from 'next/link';
import { ParamsApp } from '../../../types/app';
import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { ourFetch } from '@/utils/app';
import { apiRoutes } from '@/lib/services/apiRoutes';
import RankingList from './ranking-list';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Ranking({
	params: { lng },
}: ParamsApp) {
	const dictionary = await getDictionary(lng);
	const session = await getServerSession(authOptions);
	const currentUser = session?.user

	const { result, data } = await ourFetch({
		path: `${apiRoutes.ranking}`,
	});
	const error = !result.ok ? data : null;

	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.rankingPage.title}
			currentLanguage={lng}>
			<RankingList
				currentLanguage={lng}
				dictionary={dictionary}
				data={data}
				error={error}
				currentUser={currentUser}
			/>
		</HeaderWithFooter>
	);
}
