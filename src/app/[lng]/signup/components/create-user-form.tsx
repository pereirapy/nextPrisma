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
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OurFormField } from '@/components/our-formField';
import { cn } from '@/lib/utils';
import { ourFetch } from '@/utils/app';
import { apiRoutes } from '@/lib/services/apiRoutes';
import { toast } from '@/components/ui/use-toast';

interface CreateUserFormProps {
	currentLanguage: Locale;
	dictionary: Dictionary;
}

export function CreateUserForm({
	dictionary,
	currentLanguage,
}: CreateUserFormProps) {
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
		<div className={cn('grid gap-6')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<OurFormField
						form={form}
						name="name"
						label={dictionary.basicFields['name.label']}>
						<Input
							placeholder={dictionary.basicFields['name.placeholder']}
						/>
					</OurFormField>
					<OurFormField
						form={form}
						name="email"
						label={dictionary.basicFields['email.label']}>
						<Input
							type="email"
							placeholder={
								dictionary.basicFields['email.placeholder']
							}
						/>
					</OurFormField>
					<OurFormField
						form={form}
						name="password"
						label={dictionary.basicFields['password.label']}>
						<Input
							type="password"
							placeholder={
								dictionary.basicFields['password.placeholder']
							}
						/>
					</OurFormField>
					<OurFormField
						form={form}
						name="confirmPassword"
						label={dictionary.signUp['confirmPassword.label']}>
						<Input
							type="password"
							placeholder={
								dictionary.signUp['confirmPassword.placeholder']
							}
						/>
					</OurFormField>

					<div className="grid pt-4">
						<Button isLoading={form.formState.isSubmitting}>
							{dictionary.signUp.buttonSignUp}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
