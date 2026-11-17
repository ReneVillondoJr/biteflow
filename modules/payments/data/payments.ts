import type { PaymentTransaction } from '../types';

export const initialPayments: PaymentTransaction[] = [
  { id: 'PAY-2048', orderId: '#BF-1048', customer: 'Maria Santos', email: 'maria.santos@example.com', method: 'GCash', status: 'Paid', amount: 536, placedAt: 'Today, 10:42 AM' },
  { id: 'PAY-2047', orderId: '#BF-1047', customer: 'John Rivera', email: 'john.rivera@example.com', method: 'Card', status: 'Paid', amount: 312, placedAt: 'Today, 10:35 AM' },
  { id: 'PAY-2046', orderId: '#BF-1046', customer: 'Alicia Cruz', email: 'alicia.cruz@example.com', method: 'Cash', status: 'Pending', amount: 788, placedAt: 'Today, 10:18 AM' },
  { id: 'PAY-2045', orderId: '#BF-1045', customer: 'Ryan Garcia', email: 'ryan.garcia@example.com', method: 'Cash', status: 'Paid', amount: 168, placedAt: 'Today, 10:03 AM' },
  { id: 'PAY-2044', orderId: '#BF-1044', customer: 'Angela Lim', email: 'angela.lim@example.com', method: 'GCash', status: 'Refunded', amount: 382, placedAt: 'Today, 9:48 AM' },
  { id: 'PAY-2043', orderId: '#BF-1043', customer: 'Mark Villanueva', email: 'mark.v@example.com', method: 'Card', status: 'Failed', amount: 470, placedAt: 'Today, 9:36 AM' },
  { id: 'PAY-2042', orderId: '#BF-1042', customer: 'Sofia Reyes', email: 'sofia.reyes@example.com', method: 'GCash', status: 'Paid', amount: 624, placedAt: 'Yesterday, 8:14 PM' },
  { id: 'PAY-2041', orderId: '#BF-1041', customer: 'Paolo Mendoza', email: 'paolo.m@example.com', method: 'Card', status: 'Paid', amount: 294, placedAt: 'Yesterday, 7:52 PM' },
  { id: 'PAY-2040', orderId: '#BF-1040', customer: 'Isabel Tan', email: 'isabel.tan@example.com', method: 'GCash', status: 'Pending', amount: 840, placedAt: 'Yesterday, 7:21 PM' },
];
