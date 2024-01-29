import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().max(20).min(4),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const defaultValues: Partial<LoginFormValues> = {
  // email: 'eTts@mgia.loc',
  // password: `95032E9E3307`,
  email: 'nard_eotbmso@ohmtia.loc',
  password: `95032E9E3307`,
};
