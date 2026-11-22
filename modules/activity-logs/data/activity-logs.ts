import type { ActivityLog } from '../types/activity-log';

export const initialActivityLogs: ActivityLog[] = [
  { id: 'ACT-2084', actor: 'Mia Santos', role: 'Manager', action: 'Updated order status', target: 'Order #BF-1048 · Preparing → Ready', category: 'Orders', result: 'Success', occurredAt: '2026-11-21T10:42:00+08:00', ipAddress: '192.168.1.24' },
  { id: 'ACT-2083', actor: 'Daniel Reyes', role: 'Administrator', action: 'Changed menu availability', target: 'Signature Chicken Rice Bowl', category: 'Menu', result: 'Success', occurredAt: '2026-11-21T10:36:00+08:00', ipAddress: '192.168.1.18' },
  { id: 'ACT-2082', actor: 'Ava Lim', role: 'Cashier', action: 'Recorded payment', target: 'Order #BF-1047 · GCash · P 312', category: 'Payments', result: 'Success', occurredAt: '2026-11-21T10:31:00+08:00', ipAddress: '192.168.1.31' },
  { id: 'ACT-2081', actor: 'System', role: 'Automated', action: 'Failed sign-in attempt', target: 'admin@biteflow.example', category: 'Security', result: 'Warning', occurredAt: '2026-11-21T10:25:00+08:00', ipAddress: '203.0.113.42' },
  { id: 'ACT-2080', actor: 'Mia Santos', role: 'Manager', action: 'Added staff member', target: 'Noah Garcia · Kitchen staff', category: 'Staff', result: 'Success', occurredAt: '2026-11-21T10:18:00+08:00', ipAddress: '192.168.1.24' },
  { id: 'ACT-2079', actor: 'Daniel Reyes', role: 'Administrator', action: 'Updated restaurant details', target: 'Contact phone number', category: 'Settings', result: 'Success', occurredAt: '2026-11-21T09:54:00+08:00', ipAddress: '192.168.1.18' },
  { id: 'ACT-2078', actor: 'Ava Lim', role: 'Cashier', action: 'Voided payment', target: 'Transaction PAY-8091 · P 536', category: 'Payments', result: 'Warning', occurredAt: '2026-11-21T09:47:00+08:00', ipAddress: '192.168.1.31' },
  { id: 'ACT-2077', actor: 'Mia Santos', role: 'Manager', action: 'Cancelled order', target: 'Order #BF-1043 · Customer request', category: 'Orders', result: 'Success', occurredAt: '2026-11-21T09:36:00+08:00', ipAddress: '192.168.1.24' },
  { id: 'ACT-2076', actor: 'System', role: 'Automated', action: 'Access denied', target: '/admin/settings · Insufficient permission', category: 'Security', result: 'Failed', occurredAt: '2026-11-21T09:22:00+08:00', ipAddress: '203.0.113.17' },
  { id: 'ACT-2075', actor: 'Daniel Reyes', role: 'Administrator', action: 'Updated item price', target: 'Berry Cheesecake · P 144 → P 152', category: 'Menu', result: 'Success', occurredAt: '2026-11-21T09:05:00+08:00', ipAddress: '192.168.1.18' },
  { id: 'ACT-2074', actor: 'Ava Lim', role: 'Cashier', action: 'Signed in', target: 'Admin workspace', category: 'Security', result: 'Success', occurredAt: '2026-11-21T08:52:00+08:00', ipAddress: '192.168.1.31' },
  { id: 'ACT-2073', actor: 'Mia Santos', role: 'Manager', action: 'Adjusted stock count', target: 'Arabica coffee beans · 8 kg', category: 'Settings', result: 'Success', occurredAt: '2026-11-21T08:41:00+08:00', ipAddress: '192.168.1.24' },
];
