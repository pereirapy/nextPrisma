import { ParamsApp } from '../../types/app';
import { getDictionary } from '../i18n';
import { apiRoutes } from '@/lib/services/apiRoutes';
import { ourFetch } from '@/utils/app';
import HeaderWithFooter from '@/components/header-with_footer';
import VersionList from './versions-list';
import { Metadata } from 'next';
import { getVersions } from '@/lib/services/versions';

export async function generateMetadata({
	params: { lng },
}: ParamsApp): Promise<Metadata> {
	const dictionary = await getDictionary(lng);

	return {
		title: dictionary.versionsPage['metaData.title'],
		description: dictionary.versionsPage['metaData.description'],
	};
}

export default async function Home({ params: { lng } }: ParamsApp) {
	const dictionary = await getDictionary(lng);

	const { versions, error } = await getVersions();


	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.versionsPage.title}
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
