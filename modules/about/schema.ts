import { z } from 'zod';

export const storyHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().min(1),
  description: z.string().min(1),
  actionLabel: z.string().min(1),
  image: z.string().url(),
});

export const originSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  imageAlt: z.string().min(1),
  note: z.string().min(1),
});

export const valueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.enum(['heart', 'leaf', 'utensils']),
});

export const aboutDataSchema = z.object({
  hero: storyHeroSchema,
  origin: originSchema,
  values: z.array(valueSchema),
});
