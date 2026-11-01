import { z } from 'zod';

export const offerCategorySchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
});

export const offerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  categorySlug: z.string().min(1),
  price: z.number().int().nonnegative(),
  saving: z.number().int().nonnegative(),
  image: z.string().url(),
  href: z.string().startsWith('/'),
  availability: z.string().min(1),
  theme: z.enum(['green', 'amber', 'rose']),
});

export const offersHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().min(1),
  description: z.string().min(1),
  actionLabel: z.string().min(1),
  featuredLabel: z.string().min(1),
  featuredNote: z.string().min(1),
  image: z.string().url(),
});

export const offersDataSchema = z.object({
  hero: offersHeroSchema,
  categories: z.array(offerCategorySchema),
  offers: z.array(offerSchema),
});
