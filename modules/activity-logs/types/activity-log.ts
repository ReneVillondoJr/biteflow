export type ActivityCategory = 'Orders' | 'Menu' | 'Staff' | 'Payments' | 'Security' | 'Settings';
export type ActivityResult = 'Success' | 'Warning' | 'Failed';

export type ActivityLog = {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  category: ActivityCategory;
  result: ActivityResult;
  occurredAt: string;
  ipAddress: string;
};
