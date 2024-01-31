import * as React from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

type OurRender = ({
  field,
  fieldState,
  formState,
}: {
  field: ControllerRenderProps<any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
}) => React.ReactElement;

export type OurFormFieldProps = {
  form: UseFormReturn<any>;
  label?: string;
  name: string;
  defaultValue?: string;
  formDescription?: string;
  formControlClassName?: string;
} & (
  | {
      children: React.ReactElement;
      ourRender?: OurRender;
    }
  | {
      children?: React.ReactElement;
      ourRender: OurRender;
    }
);

export const OurFormField = ({
  form,
  label,
  name,
  defaultValue,
  children,
  formDescription,
  ourRender,
  formControlClassName,
}: OurFormFieldProps) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <FormItem className="mb-4">
          {label && <FormLabel className="mr-2">{label}</FormLabel>}
          <FormControl className={formControlClassName}>
            {children
              ? React.cloneElement(children, {
                  ...children.props,
                  ...field,
                  value: field.value ?? '',
                })
              : ourRender && ourRender({ field, fieldState, formState })}
          </FormControl>
          {{ formDescription } && (
            <FormDescription> {formDescription} </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
