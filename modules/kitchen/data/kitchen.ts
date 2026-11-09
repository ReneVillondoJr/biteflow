import type { KitchenTicket } from '../types/kitchen';

export const initialKitchenTickets: KitchenTicket[] = [
  {
    id: 'KT-101', orderNumber: '#BF-4821', customer: 'Avery Santos', type: 'Delivery',
    station: 'Grill', status: 'Queued', priority: 'Priority', held: false,
    elapsedSeconds: 48, startedAt: null, placedAt: '2 min ago',
    items: [
      { name: 'Signature Chicken Rice Bowl', quantity: 2, note: 'Sauce on the side' },
      { name: 'Classic Chicken Meal', quantity: 1 },
    ],
  },
  {
    id: 'KT-102', orderNumber: '#BF-4820', customer: 'Miguel Cruz', type: 'Pickup',
    station: 'Fryer', status: 'Preparing', priority: 'Normal', held: false,
    elapsedSeconds: 390, startedAt: 1, placedAt: '8 min ago',
    items: [
      { name: 'Crispy Chicken Rice Meal', quantity: 2 },
      { name: 'Loaded Fries', quantity: 1, note: 'Extra cheese' },
    ],
  },
  {
    id: 'KT-103', orderNumber: '#BF-4819', customer: 'Table 12', type: 'Dine-in',
    station: 'Assembly', status: 'Preparing', priority: 'Priority', held: false,
    elapsedSeconds: 720, startedAt: 1, placedAt: '13 min ago',
    items: [
      { name: 'Signature Chicken Rice Bowl', quantity: 3 },
      { name: 'Iced Tea', quantity: 3 },
    ],
  },
  {
    id: 'KT-104', orderNumber: '#BF-4818', customer: 'Nina Ramos', type: 'Pickup',
    station: 'Drinks', status: 'Ready', priority: 'Normal', held: false,
    elapsedSeconds: 560, startedAt: 1, placedAt: '10 min ago',
    items: [
      { name: 'Peach Lemonade', quantity: 2 },
      { name: 'Chocolate Lava Cake', quantity: 1 },
    ],
  },
  {
    id: 'KT-105', orderNumber: '#BF-4817', customer: 'Dine-in Table 4', type: 'Dine-in',
    station: 'Fryer', status: 'Queued', priority: 'Normal', held: false,
    elapsedSeconds: 95, startedAt: null, placedAt: '3 min ago',
    items: [
      { name: 'Chicken Wings', quantity: 1, note: 'Medium spicy' },
      { name: 'Honey Lemonade', quantity: 2 },
    ],
  },
  {
    id: 'KT-106', orderNumber: '#BF-4816', customer: 'Liam Garcia', type: 'Delivery',
    station: 'Grill', status: 'Ready', priority: 'Priority', held: false,
    elapsedSeconds: 810, startedAt: 1, placedAt: '16 min ago',
    items: [
      { name: 'Classic Chicken Meal', quantity: 2 },
      { name: 'Garlic Rice', quantity: 2 },
    ],
  },
  {
    id: 'KT-107', orderNumber: '#BF-4815', customer: 'Table 7', type: 'Dine-in',
    station: 'Dessert', status: 'Preparing', priority: 'Normal', held: true,
    elapsedSeconds: 300, startedAt: 1, placedAt: '7 min ago',
    items: [
      { name: 'Chocolate Lava Cake', quantity: 2, note: 'One takeaway' },
      { name: 'Vanilla Ice Cream', quantity: 2 },
    ],
  },
];
