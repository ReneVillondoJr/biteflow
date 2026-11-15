import { z } from 'zod';

export const promotionSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(2, 'Enter a promotion name.').max(80),
  code: z.string().trim().min(3, 'Enter a code with at least 3 characters.').max(20).regex(/^[A-Z0-9-]+$/, 'Use only uppercase letters, numbers, and hyphens.'),
  description: z.string().trim().max(180),
  kind: z.enum(['percentage', 'fixed', 'bundle']),
  value: z.number().positive('Value must be greater than zero.'),
  startDate: z.string().date(),
  endDate: z.string().date(),
  status: z.enum(['active', 'paused', 'draft']),
}).refine((promotion) => promotion.endDate >= promotion.startDate, {
  message: 'End date must be on or after the start date.',
  path: ['endDate'],
}).refine((promotion) => promotion.kind !== 'percentage' || promotion.value <= 100, {
  message: 'Percentage discounts cannot exceed 100%.',
  path: ['value'],
});

export const promotionsDataSchema = z.object({ promotions: z.array(promotionSchema) }).superRefine(({ promotions }, context) => {
  const codes = new Set<string>();
  promotions.forEach((promotion, index) => {
    const code = promotion.code.toUpperCase();
    if (codes.has(code)) context.addIssue({ code: 'custom', message: 'Promotion codes must be unique.', path: ['promotions', index, 'code'] });
    codes.add(code);
  });
});
export type Promotion = z.infer<typeof promotionSchema>;
export type PromotionsData = z.infer<typeof promotionsDataSchema>;
