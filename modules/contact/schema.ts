import { z } from 'zod';

export const contactTopicSchema = z.enum([
  'general',
  'order',
  'feedback',
  'partnership',
]);

export const contactDetailsSchema = z.object({
  title: z.string().min(1),
  value: z.string().min(1),
  action: z.string().min(1),
  icon: z.enum(['phone', 'mail', 'clock']),
});

export const contactDataSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().min(1),
  description: z.string().min(1),
  details: z.array(contactDetailsSchema),
});
