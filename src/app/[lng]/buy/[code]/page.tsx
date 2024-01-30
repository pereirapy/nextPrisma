import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { Params } from '@/types/tgver07';
import VersionToBuy from './version-to-buy';
import { routes } from '@/config/routes';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ParamsApp } from '@/types/app';
import { Metadata } from 'next';
import { CALLBACK_URL } from '@/utils/constants';
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

	const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${lng}${routes.signIn}?${CALLBACK_URL}=/${lng}${routes.buy}/${code}`);
  }

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
