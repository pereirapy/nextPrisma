import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Dictionary } from '@/types/app';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { OurFormField } from '@/components/our-formField';

import { CreateFormValues } from '../data/schema';

interface CreateUserFormProps {
  dictionary: Dictionary;
  form: UseFormReturn<CreateFormValues, any, undefined>;
  onSubmit: (data: CreateFormValues) => Promise<void>;
}

export function CreateUserForm({
  dictionary,
  form,
  onSubmit,
}: CreateUserFormProps) {
  return (
    <div className={cn('grid gap-6')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <OurFormField
            form={form}
            name="name"
            label={dictionary.basicFields['name.label']}>
            <Input placeholder={dictionary.basicFields['name.placeholder']} />
          </OurFormField>
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
          <OurFormField
            form={form}
            name="confirmPassword"
            label={dictionary.signUp['confirmPassword.label']}>
            <Input
              type="password"
              placeholder={dictionary.signUp['confirmPassword.placeholder']}
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
