import { z } from 'zod';

export const createFormSchema = z
	.object({
		name: z.string().min(4),
		email: z.string().email(),
		password: z.string().max(20).min(8),
		confirmPassword: z.string().max(20).min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
	});

export type CreateFormValues = z.infer<typeof createFormSchema>;

export const defaultValues: Partial<CreateFormValues> = {
	name: '',
	email: '',
	password: ``,
	confirmPassword: ``,
};
