import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';

import { CreateUserForm } from './components/create-user-form';
import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';

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
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<p className="text-sm text-muted-foreground">
						{dictionary.signUp['page.subtitle']}
					</p>
				</div>
				<CreateUserForm
					currentLanguage={lng}
					dictionary={dictionary}
				/>
			</div>
		</HeaderWithFooter>
	);
}
