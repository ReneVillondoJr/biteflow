import { z } from 'zod';

export const settingsSchema = z.object({
  restaurantName: z.string().trim().min(2).max(80),
  contactEmail: z.string().trim().email().or(z.literal('')),
  contactPhone: z.string().trim().max(30),
  address: z.string().trim().max(160),
  currency: z.enum(['PHP', 'USD']),
  timezone: z.enum(['Asia/Manila', 'Asia/Singapore', 'America/Los_Angeles']),
  orderNotifications: z.boolean(),
  lowStockNotifications: z.boolean(),
  dailySummary: z.boolean(),
  requireManagerApproval: z.boolean(),
});

export type Settings = z.infer<typeof settingsSchema>;
