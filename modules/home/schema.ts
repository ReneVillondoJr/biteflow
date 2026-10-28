import { z } from 'zod';

const internalLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().startsWith('/'),
});

const menuCategorySchema = z.object({
  label: z.string().min(1),
  slug: z.string().min(1),
});

const featuredMenuItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  image: z.string().url(),
  badge: z.string().optional(),
});

const highlightSchema = z.object({
  icon: z.enum(['leaf', 'chef-hat', 'package-check']),
  title: z.string().min(1),
  description: z.string().min(1),
});

const storyPointSchema = z.object({
  icon: z.enum(['heart', 'leaf', 'utensils-crossed']),
  title: z.string().min(1),
  description: z.string().min(1),
});

const orderingStepSchema = z.object({
  number: z.string().min(1),
  icon: z.enum(['shopping-bag', 'utensils-crossed', 'package-check']),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const homeContentSchema = z.object({
  heroImage: z.string().url(),
  storyImage: z.string().url(),

  restaurantLinks: z.array(internalLinkSchema),
  exploreLinks: z.array(internalLinkSchema),

  menuCategories: z.array(menuCategorySchema),
  featuredItems: z.array(featuredMenuItemSchema),

  highlights: z.array(highlightSchema),
  storyPoints: z.array(storyPointSchema),
  orderingSteps: z.array(orderingStepSchema),
});
