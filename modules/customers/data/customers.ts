import type { CustomersData } from '../schema';

export const customersData: CustomersData = {
  customers: [
    { id: 'customer-maria-santos', name: 'Maria Santos', email: 'maria.santos@example.com', phone: '+63 917 234 1088', joinedAt: '2025-09-12', status: 'active', tier: 'vip', preferredContact: 'sms', notes: 'Prefers delivery updates by text.', ordersCount: 28, lifetimeValue: 15480 },
    { id: 'customer-john-rivera', name: 'John Rivera', email: 'john.rivera@example.com', phone: '+63 918 442 9912', joinedAt: '2025-11-03', status: 'active', tier: 'regular', preferredContact: 'email', notes: '', ordersCount: 9, lifetimeValue: 4260 },
    { id: 'customer-alicia-cruz', name: 'Alicia Cruz', email: 'alicia.cruz@example.com', phone: '+63 922 183 7704', joinedAt: '2025-08-21', status: 'active', tier: 'vip', preferredContact: 'phone', notes: 'Please call if a delivery is delayed.', ordersCount: 34, lifetimeValue: 21890 },
    { id: 'customer-ryan-garcia', name: 'Ryan Garcia', email: 'ryan.garcia@example.com', phone: '+63 919 671 2201', joinedAt: '2026-02-16', status: 'active', tier: 'regular', preferredContact: 'sms', notes: '', ordersCount: 4, lifetimeValue: 1920 },
    { id: 'customer-angela-lim', name: 'Angela Lim', email: 'angela.lim@example.com', phone: '+63 927 510 4436', joinedAt: '2025-12-08', status: 'inactive', tier: 'regular', preferredContact: 'email', notes: 'Requested no promotional emails.', ordersCount: 12, lifetimeValue: 6380 },
    { id: 'customer-mark-villanueva', name: 'Mark Villanueva', email: 'mark.v@example.com', phone: '+63 915 384 0028', joinedAt: '2026-04-05', status: 'active', tier: 'regular', preferredContact: 'phone', notes: '', ordersCount: 3, lifetimeValue: 1410 },
  ],
};
