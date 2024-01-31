import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';

import { getDictionary } from '@/lib/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { CreateUserContainer } from './components/create-user-container';

export async function generateMetadata({
	params: { lng },
}: ParamsApp): Promise<Metadata> {
	const dictionary = await getDictionary(lng);

	return {
		title: dictionary.signUp['metaData.title'],
		description: dictionary.signUp['metaData.description'],
	};
}

export default async function SignUpPage({
	params: { lng },
}: ParamsApp) {
	const dictionary = await getDictionary(lng);
	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.signUp['page.title']}
			currentLanguage={lng}>
				<CreateUserContainer
					currentLanguage={lng}
					dictionary={dictionary}
				/>
		</HeaderWithFooter>
	);
}
