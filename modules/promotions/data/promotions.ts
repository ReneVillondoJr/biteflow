import type { PromotionsData } from '../schema';

function dateOffset(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

export const promotionsData: PromotionsData = {
  promotions: [
    {
      id: 'promo-welcome15',
      name: 'Welcome offer',
      code: 'WELCOME15',
      description: 'A first-order discount for new customers.',
      kind: 'percentage',
      value: 15,
      startDate: dateOffset(-7),
      endDate: dateOffset(30),
      status: 'active',
    },
    {
      id: 'promo-lunch50',
      name: 'Lunch break savings',
      code: 'LUNCH50',
      description: 'Save ₱50 on lunch orders over ₱299.',
      kind: 'fixed',
      value: 50,
      startDate: dateOffset(2),
      endDate: dateOffset(45),
      status: 'active',
    },
    {
      id: 'promo-family-bundle',
      name: 'Family meal bundle',
      code: 'FAMILY-BUNDLE',
      description: 'A set price for a shareable family meal.',
      kind: 'bundle',
      value: 799,
      startDate: dateOffset(-2),
      endDate: dateOffset(60),
      status: 'paused',
    },
  ],
};
