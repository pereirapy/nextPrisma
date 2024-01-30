'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { routes } from '@/config/routes';
import { toastMessageError } from '@/lib/auth/error-message';

import {
	CreateFormValues,
	defaultValues,
	createFormSchema,
} from '../data/schema';
import { Locale } from '@/app/i18n/settings';
import { Dictionary } from '@/types/app';
import { ourFetch } from '@/utils/app';
import { apiRoutes } from '@/lib/services/apiRoutes';
import { toast } from '@/components/ui/use-toast';
import { CreateUserForm } from './create-user-form';

interface CreateUserContainerProps {
	currentLanguage: Locale;
	dictionary: Dictionary;
}

export function CreateUserContainer({
	dictionary,
	currentLanguage,
}: CreateUserContainerProps) {
	const router = useRouter();

	const form = useForm<CreateFormValues>({
		resolver: zodResolver(createFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const onSubmit = async (dataForm: CreateFormValues) => {
		try {
			const { result, data } = await ourFetch({
				path: apiRoutes.signUp,
				method: 'POST',
				data: dataForm,
			});

			if (!result.ok) {
				toastMessageError({
					dictionary,
					// @ts-ignore
					errorMessage: dictionary.errors[data],
				});
				return;
			}
			toast({
				title: dictionary.common['toast.success.title'],
				description: dictionary.common.dataSaved,
			});
			router.push(`/${currentLanguage}/${routes.signIn}`);
		} catch (errorMessage: any) {
			toastMessageError({
				dictionary,
				errorMessage,
			});
		}
	};

	return (
		<CreateUserForm form={form} dictionary={dictionary} onSubmit={onSubmit} />
	);
}
