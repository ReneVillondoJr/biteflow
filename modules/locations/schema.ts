import { z } from 'zod';

export const locationServiceSchema = z.enum(['pickup', 'delivery']);

export const locationSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  area: z.string().min(1),
  address: z.string().min(1),
  hours: z.string().min(1),
  distance: z.string().min(1),
  image: z.string().url(),
  services: z.array(locationServiceSchema),
});

export const locationsDataSchema = z.object({
  locations: z.array(locationSchema),
});
