import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Dictionary } from '@/types/app';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OurFormField } from '@/components/our-formField';

import { LoginFormValues } from '../data/schema';

interface UserAuthFormProps {
  dictionary: Dictionary;
  form: UseFormReturn<LoginFormValues, any, undefined>;
  onSubmit: (data: LoginFormValues) => Promise<void>;
}

export function UserAuthForm({
  dictionary,
  form,
  onSubmit,
}: UserAuthFormProps) {
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
