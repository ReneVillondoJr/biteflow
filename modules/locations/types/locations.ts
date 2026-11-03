import type { z } from 'zod';

import type {
  locationSchema,
  locationServiceSchema,
  locationsDataSchema,
} from '../schema';

export type LocationService = z.infer<typeof locationServiceSchema>;
export type BiteFlowLocation = z.infer<typeof locationSchema>;
export type LocationsData = z.infer<typeof locationsDataSchema>;
export type LocationFilter = 'all' | LocationService;
