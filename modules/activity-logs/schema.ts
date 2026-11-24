import type { ActivityCategory, ActivityResult } from './types/activity-log';

export const activityLogSchema = {
  categoryOptions: ['All categories', 'Orders', 'Menu', 'Staff', 'Payments', 'Security', 'Settings'] as const,
  resultOptions: ['All results', 'Success', 'Warning', 'Failed'] as const,
  pageSize: 10,
} as const;

export const activityCategories: ActivityCategory[] = ['Orders', 'Menu', 'Staff', 'Payments', 'Security', 'Settings'];
export const activityResults: ActivityResult[] = ['Success', 'Warning', 'Failed'];
