import { z } from 'zod';

export const staffRoles = ['manager', 'supervisor', 'cashier', 'cook', 'server', 'delivery'] as const;
export const adminSections = ['dashboard', 'orders', 'kitchen', 'delivery', 'menu', 'inventory', 'promotions', 'customers', 'payments', 'staff', 'payroll', 'reports', 'activity-logs', 'settings'] as const;
export const staffRoleSchema = z.enum(staffRoles);
const sectionListSchema = z.array(z.enum(adminSections)).refine((sections) => new Set(sections).size === sections.length, 'Each admin section can be assigned only once.');
export const roleAccessSchema = z.object({
  manager: sectionListSchema,
  supervisor: sectionListSchema,
  cashier: sectionListSchema,
  cook: sectionListSchema,
  server: sectionListSchema,
  delivery: sectionListSchema,
});

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
  navigationRole: staffRoleSchema,
  roleAccess: roleAccessSchema,
}).superRefine(({ roleAccess }, context) => {
  if (roleAccess.manager.length !== adminSections.length || !adminSections.every((section) => roleAccess.manager.includes(section))) {
    context.addIssue({ code: 'custom', message: 'Admin / Manager must retain full access.', path: ['roleAccess', 'manager'] });
  }
  const limits: Record<Exclude<StaffRole, 'manager'>, number> = { supervisor: 10, cashier: 7, cook: 5, server: 4, delivery: 3 };
  for (const [role, limit] of Object.entries(limits) as [keyof typeof limits, number][]) {
    if (roleAccess[role].length > limit) context.addIssue({ code: 'custom', message: `${role} can have up to ${limit} admin sections.`, path: ['roleAccess', role] });
  }
});

export type Settings = z.infer<typeof settingsSchema>;
export type StaffRole = (typeof staffRoles)[number];
export type AdminSection = (typeof adminSections)[number];
