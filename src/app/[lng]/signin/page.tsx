import { Metadata } from 'next';

import { ParamsApp } from '@/types/app';

import { UserAuthForm } from './components/user-auth-form';
import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { OurLink } from '@/components/ui/our-link';
import { routes } from '@/config/routes';
import { UserAuthContainer } from './components/user-auth-container';

export async function generateMetadata({
	params: { lng },
}: ParamsApp): Promise<Metadata> {
	const dictionary = await getDictionary(lng);

	return {
		title: dictionary.login['metaData.title'],
		description: dictionary.login['metaData.description'],
	};
}

export default async function AuthenticationPage({
	params: { lng },
}: ParamsApp) {
	const dictionary = await getDictionary(lng);
	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={dictionary.login['page.title']}
			currentLanguage={lng}>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<p className="text-sm text-muted-foreground">
						{dictionary.login['page.subtitle']}
					</p>
				</div>
				<UserAuthContainer
					currentLanguage={lng}
					dictionary={dictionary}
				/>
				<div className='text-center'>
					{dictionary.login.noAccount}
					<OurLink href={`/${lng}${routes.signUp}`}>
						{dictionary.common.signUp}
					</OurLink>
				</div>
			</div>
		</HeaderWithFooter>
	);
}
