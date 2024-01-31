'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { routes } from '@/config/routes';
import { toastMessageError } from '@/lib/auth/error-message';

import {
	LoginFormValues,
	defaultValues,
	loginFormSchema,
} from '../data/schema';
import { Locale } from '@/lib/i18n/settings';
import { Dictionary } from '@/types/app';
import { UserAuthForm } from './user-auth-form';
import { CALLBACK_URL } from '@/utils/constants';
import { OurLink } from '@/components/ui/our-link';

interface UserAuthContainerProps {
	currentLanguage: Locale;
	dictionary: Dictionary;
}

export function UserAuthContainer({
	dictionary,
	currentLanguage,
}: UserAuthContainerProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get(CALLBACK_URL);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const onSubmit = async (data: LoginFormValues) => {
		const { email, password } = data;

		try {
			const resultSingIn = await signIn('credentials', {
				redirect: Boolean(false),
				email,
				password,
				callbackUrl:
					redirectTo || `/${currentLanguage}${routes.home}`,
			});

			if (resultSingIn?.error == 'CredentialsSignin') {
				toastMessageError({
					dictionary,
					errorMessage: dictionary.errors.CredentialsSignin,
				});
				return;
			}

			if (resultSingIn?.ok && resultSingIn?.url)
				router.push(`${resultSingIn.url}`);
			else router.push(`/${currentLanguage}${routes.home}`);
		} catch (errorMessage: any) {
			toastMessageError({
				dictionary,
				errorMessage,
			});
		}
	};

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div className="flex flex-col space-y-2 text-center">
				<p className="text-sm text-muted-foreground">
					{dictionary.login['page.subtitle']}
				</p>
			</div>
			<UserAuthForm
				form={form}
				onSubmit={onSubmit}
				dictionary={dictionary}
			/>
			<div className="text-center">
				{dictionary.login.noAccount}
				<OurLink href={`/${currentLanguage}${routes.signUp}`}>
					{dictionary.common.signUp}
				</OurLink>
			</div>
		</div>
	);
}
