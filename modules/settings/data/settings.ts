import type { Settings } from '../schema';

export const defaultSettings: Settings = {
  restaurantName: 'Biteflow Kitchen',
  contactEmail: 'hello@biteflow.com',
  contactPhone: '',
  address: '',
  currency: 'PHP',
  timezone: 'Asia/Manila',
  orderNotifications: true,
  lowStockNotifications: true,
  dailySummary: false,
  requireManagerApproval: true,
};
