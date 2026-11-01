import type { z } from 'zod';

import type {
  offerCategorySchema,
  offerSchema,
  offersDataSchema,
  offersHeroSchema,
} from '../schema';

export type OfferCategory = z.infer<typeof offerCategorySchema>;
export type Offer = z.infer<typeof offerSchema>;
export type OffersHero = z.infer<typeof offersHeroSchema>;
export type OffersData = z.infer<typeof offersDataSchema>;
