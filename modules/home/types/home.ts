import type { z } from 'zod';

import type { homeContentSchema } from '../schema';

export type HomeContent = z.infer<typeof homeContentSchema>;

export type HomeLink = HomeContent['restaurantLinks'][number];

export type HomeMenuCategory = HomeContent['menuCategories'][number];

export type FeaturedMenuItem = HomeContent['featuredItems'][number];

export type HomeHighlight = HomeContent['highlights'][number];

export type HomeStoryPoint = HomeContent['storyPoints'][number];

export type HomeOrderingStep = HomeContent['orderingSteps'][number];
