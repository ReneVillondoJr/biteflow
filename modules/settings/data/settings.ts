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
  navigationRole: 'manager',
  roleAccess: {
    manager: ['dashboard', 'orders', 'kitchen', 'delivery', 'menu', 'inventory', 'promotions', 'customers', 'payments', 'staff', 'payroll', 'reports', 'activity-logs', 'settings'],
    supervisor: ['dashboard', 'orders', 'kitchen', 'delivery', 'menu', 'inventory', 'customers', 'payments', 'reports', 'activity-logs'],
    cashier: ['dashboard', 'orders', 'menu', 'inventory', 'customers', 'payments', 'reports'],
    cook: ['dashboard', 'orders', 'kitchen', 'menu', 'inventory'],
    server: ['dashboard', 'orders', 'kitchen', 'customers'],
    delivery: ['dashboard', 'orders', 'delivery'],
  },
};
