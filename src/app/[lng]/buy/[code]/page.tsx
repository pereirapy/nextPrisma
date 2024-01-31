import { getDictionary } from '@/lib/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { Params } from '@/types/tgver07';
import VersionToBuy from './version-to-buy';
import { ParamsApp } from '@/types/app';
import { Metadata } from 'next';
import { getVersion } from '@/lib/services/versions';

export async function generateMetadata({
	params: { lng },
}: ParamsApp): Promise<Metadata> {
	const dictionary = await getDictionary(lng);

	return {
		title: dictionary.buyPage['metaData.title'],
		description: dictionary.buyPage['metaData.description'],
	};
}

export default async function BuyPage({ params: { lng, code } }: Params) {

	const dictionary = await getDictionary(lng);
	const { version, error } = await getVersion(code);

	return (
		<HeaderWithFooter
			dictionary={dictionary}
			currentLanguage={lng}
			title={dictionary.buyPage.title}
			>
			<VersionToBuy dictionary={dictionary} data={version} error={error}  />
		</HeaderWithFooter>
	);
}
