import {
  ShoppingBag,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react';

import type { DashboardMetric, DashboardOrder, PopularItem, RevenuePoint } from '../types/dashboard';

export const revenuePoints: RevenuePoint[] = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 74 },
  { day: 'Wed', value: 68 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 82 },
  { day: 'Sat', value: 96 },
  { day: 'Sun', value: 91 },
];

export const metrics: DashboardMetric[] = [
  { label: 'Total revenue', value: 'P 284,620', change: '+12.5%', detail: 'vs. last month', icon: WalletCards, tone: 'green' },
  { label: 'Total orders', value: '1,842', change: '+8.2%', detail: 'vs. last month', icon: ShoppingBag, tone: 'amber' },
  { label: 'New customers', value: '326', change: '+16.4%', detail: 'vs. last month', icon: Users, tone: 'blue' },
  { label: 'Avg. order value', value: 'P 154.50', change: '+3.7%', detail: 'vs. last month', icon: TrendingUp, tone: 'rose' },
];

export const orders: DashboardOrder[] = [
  { id: '#BF-1048', customer: 'Maria Santos', items: '3 items', total: 'P 486', status: 'Preparing', time: '4 min' },
  { id: '#BF-1047', customer: 'John Rivera', items: '2 items', total: 'P 312', status: 'Ready', time: '7 min' },
  { id: '#BF-1046', customer: 'Alicia Cruz', items: '4 items', total: 'P 728', status: 'On delivery', time: '12 min' },
  { id: '#BF-1045', customer: 'Ryan Garcia', items: '1 item', total: 'P 168', status: 'Preparing', time: '15 min' },
];

export const popularItems: PopularItem[] = [
  { name: 'Signature Steak', category: 'Mains', orders: 284, value: 'P 42,600', color: '#254b3a' },
  { name: 'Creamy Truffle Pasta', category: 'Pasta', orders: 231, value: 'P 32,340', color: '#d6a15d' },
  { name: 'Crispy Chicken Bowl', category: 'Bowls', orders: 198, value: 'P 24,750', color: '#6f8f7d' },
  { name: 'Berry Cheesecake', category: 'Dessert', orders: 176, value: 'P 17,600', color: '#bb5547' },
];
