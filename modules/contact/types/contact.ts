import type { z } from 'zod';

import type {
  contactDataSchema,
  contactDetailsSchema,
  contactTopicSchema,
} from '../schema';

export type ContactTopic = z.infer<typeof contactTopicSchema>;
export type ContactDetail = z.infer<typeof contactDetailsSchema>;
export type ContactData = z.infer<typeof contactDataSchema>;
