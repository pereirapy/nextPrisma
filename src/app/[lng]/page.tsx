import { ParamsApp } from '../../types/app';
import { getDictionary } from '../i18n';
import { apiRoutes } from '@/lib/services/apiRoutes';
import { ourFetch } from '@/utils/app';
import HeaderWithFooter from '@/components/header-with_footer';
import VersionList from './versions-list';
import { tgver07 } from '@prisma/client';

export type VersionsState = {
	versions: tgver07[];
	error: string;
};

export default async function Home({ params: { lng } }: ParamsApp) {
	const dictionary = await getDictionary(lng);

	const { result, data } = await ourFetch({
		path: apiRoutes.versions,
	});
	const error = !result.ok ? data : '';
	const versionsData = { versions: data, error };


	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.versionsPage.title}
			currentLanguage={lng}>
			<VersionList
				data={versionsData}
				dictionary={dictionary}
				currentLanguage={lng}
			/>
		</HeaderWithFooter>
	);
}
