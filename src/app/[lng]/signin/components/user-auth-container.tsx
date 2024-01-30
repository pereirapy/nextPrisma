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
import { Locale } from '@/app/i18n/settings';
import { Dictionary } from '@/types/app';
import { UserAuthForm } from './user-auth-form';
import { CALLBACK_URL } from '@/utils/constants';

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
				callbackUrl: redirectTo || `/${currentLanguage}${routes.home}`,
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
		<UserAuthForm
			form={form}
			onSubmit={onSubmit}
			dictionary={dictionary}
		/>
	);
}
