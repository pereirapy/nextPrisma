import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { Params } from '@/types/tgver07';
import { ourFetch } from '@/utils/app';
import { apiRoutes } from '@/lib/services/apiRoutes';
import VersionToBuy from './version-to-buy';
import { routes } from '@/config/routes';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ParamsApp } from '@/types/app';
import { Metadata } from 'next';

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

	const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${lng}${routes.signIn}`);
  }

	const dictionary = await getDictionary(lng);
	const { result, data } = await ourFetch({
		path: `${apiRoutes.versions}/${code}`,
	});
	const error = !result.ok ? data : null;

	return (
		<HeaderWithFooter
			dictionary={dictionary}
			currentLanguage={lng}
			title={dictionary.buyPage.title}
			>
			<VersionToBuy dictionary={dictionary} data={data} error={error}  />
		</HeaderWithFooter>
	);
}
