import type { z } from 'zod';

import type {
  aboutDataSchema,
  originSchema,
  storyHeroSchema,
  valueSchema,
} from '../schema';

export type StoryHero = z.infer<typeof storyHeroSchema>;
export type Origin = z.infer<typeof originSchema>;
export type StoryValue = z.infer<typeof valueSchema>;
export type AboutData = z.infer<typeof aboutDataSchema>;
