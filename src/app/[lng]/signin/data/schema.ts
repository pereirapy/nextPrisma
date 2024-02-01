import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20).min(8),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const defaultValues: Partial<LoginFormValues> = {
  email: '',
  password: ``,
};
