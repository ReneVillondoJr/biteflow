import type { DeliveryTicket } from '../types/delivery';

export const initialDeliveryTickets: DeliveryTicket[] = [
  {
    id: '#BF-1048', customer: 'Maria Santos', phone: '+63 917 234 1088',
    address: '14 Sunrise Ave, Quezon City', rider: 'Marco Reyes', status: 'Preparing',
    total: 'P 536', payment: 'GCash', placedAt: 'Today, 10:42 AM',
    elapsedSeconds: 390, startedAt: 1, completedAt: null,
    items: [{ name: 'Signature Chicken Rice Bowl', quantity: 2 }, { name: 'Creamy Truffle Pasta', quantity: 1 }, { name: 'Iced Latte', quantity: 2 }],
  },
  {
    id: '#BF-1046', customer: 'Alicia Cruz', phone: '+63 922 183 7704',
    address: '82 Loyola Heights, Quezon City', rider: 'Jules Tan', status: 'On delivery',
    total: 'P 788', payment: 'Cash', placedAt: 'Today, 10:18 AM',
    elapsedSeconds: 980, startedAt: 1, completedAt: null,
    items: [{ name: 'Signature Steak', quantity: 1 }, { name: 'Truffle Pasta', quantity: 1 }, { name: 'Iced Tea', quantity: 2 }],
  },
  {
    id: '#BF-1043', customer: 'Mark Villanueva', phone: '+63 915 384 0028',
    address: '27 Katipunan Avenue, Quezon City', rider: 'Unassigned', status: 'Queued',
    total: 'P 470', payment: 'Card', placedAt: 'Today, 9:36 AM',
    elapsedSeconds: 120, startedAt: null, completedAt: null,
    items: [{ name: 'Signature Steak', quantity: 1 }],
  },
  {
    id: '#BF-1042', customer: 'Sofia Dela Cruz', phone: '+63 917 600 2441',
    address: '6 Maginhawa Street, Quezon City', rider: 'Paolo Cruz', status: 'Ready',
    total: 'P 624', payment: 'GCash', placedAt: 'Today, 9:28 AM',
    elapsedSeconds: 650, startedAt: 1, completedAt: null,
    items: [{ name: 'Crispy Chicken Bowl', quantity: 2 }, { name: 'Berry Cheesecake', quantity: 1 }],
  },
  {
    id: '#BF-1039', customer: 'Angela Lim', phone: '+63 927 510 4436',
    address: '91 Katipunan Ave, Quezon City', rider: 'Nico Santos', status: 'Completed',
    total: 'P 382', payment: 'GCash', placedAt: 'Today, 9:02 AM',
    elapsedSeconds: 1120, startedAt: null, completedAt: '2026-11-10T11:46:22+08:00',
    items: [{ name: 'Signature Chicken Rice Bowl', quantity: 1 }, { name: 'Berry Cheesecake', quantity: 1 }],
  },
];
