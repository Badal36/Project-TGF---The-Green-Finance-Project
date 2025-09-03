import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

