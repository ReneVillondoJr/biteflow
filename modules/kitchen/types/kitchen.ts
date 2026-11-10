export type KitchenStatus = 'Queued' | 'Preparing' | 'Ready' | 'Completed';
export type KitchenStation = 'Grill' | 'Fryer' | 'Drinks' | 'Assembly' | 'Dessert';
export type KitchenPriority = 'Normal' | 'Priority';

export type KitchenItem = {
  name: string;
  quantity: number;
  note?: string;
};

export type KitchenTicket = {
  id: string;
  orderNumber: string;
  customer: string;
  type: 'Dine-in' | 'Pickup' | 'Delivery';
  station: KitchenStation;
  status: KitchenStatus;
  priority: KitchenPriority;
  held: boolean;
  elapsedSeconds: number;
  startedAt: number | null;
  completedAt: string | null;
  placedAt: string;
  items: KitchenItem[];
};
