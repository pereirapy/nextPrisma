'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OurFormField } from '@/components/our-formField';
import { cn } from '@/lib/utils';

interface UserAuthFormProps {
  currentLanguage: Locale;
  dictionary: Dictionary;
}

export function UserAuthForm({
  dictionary,
  currentLanguage,
}: UserAuthFormProps) {
  const router = useRouter();

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
        callbackUrl: '/',
      });

      if (resultSingIn?.error == 'CredentialsSignin') {
        toastMessageError({
          dictionary,
          errorMessage: dictionary.errors.CredentialsSignin,
        });
        return;
      }

      if (resultSingIn?.ok && resultSingIn?.url) {
        router.push(
          `${resultSingIn.url}${currentLanguage}/${routes.home}`,
        );
      }
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
            name="email"
            label={dictionary.basicFields['email.label']}>
            <Input
              type="email"
              placeholder={dictionary.basicFields['email.placeholder']}
            />
          </OurFormField>
          <OurFormField
            form={form}
            name="password"
            label={dictionary.basicFields['password.label']}>
            <Input
              type="password"
              placeholder={dictionary.basicFields['password.placeholder']}
            />
          </OurFormField>

          <div className="grid pt-4">
            <Button isLoading={form.formState.isSubmitting}>
              {dictionary.login['input.connect']}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
