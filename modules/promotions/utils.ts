import type { Promotion } from './schema';

export type PromotionStatus = Promotion['status'] | 'scheduled' | 'expired';

export function localDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getPromotionStatus(promotion: Promotion, today: string): PromotionStatus {
  if (promotion.status === 'draft' || promotion.status === 'paused') return promotion.status;
  if (!today) return promotion.status;
  if (promotion.endDate < today) return 'expired';
  if (promotion.startDate > today) return 'scheduled';
  return 'active';
}
