'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ourFetch } from '@/utils/app';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Dictionary } from '@/types/app';
import { routes } from '@/config/routes';
import { toastMessageError } from '@/lib/auth/error-message';
import { Locale } from '@/lib/i18n/settings';
import { apiRoutes } from '@/lib/services/apiRoutes';
import { OurLink } from '@/components/ui/our-link';
import { toast } from '@/components/ui/use-toast';

import {
  createFormSchema,
  CreateFormValues,
  defaultValues,
} from '../data/schema';
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
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          {dictionary.signUp['page.subtitle']}
        </p>
      </div>
      <CreateUserForm
        form={form}
        dictionary={dictionary}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        {dictionary.login.haveAccount}
        <OurLink href={`/${currentLanguage}${routes.signIn}`}>
          {dictionary.common.signIn}
        </OurLink>
      </div>
    </div>
  );
}
