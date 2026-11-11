export type DeliveryStatus = 'Queued' | 'Preparing' | 'Ready' | 'On delivery' | 'Completed';

export type DeliveryTicket = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  rider: string;
  status: DeliveryStatus;
  total: string;
  payment: string;
  placedAt: string;
  elapsedSeconds: number;
  startedAt: number | null;
  completedAt: string | null;
  items: { name: string; quantity: number }[];
};
