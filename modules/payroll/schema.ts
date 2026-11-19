import { z } from 'zod';

export const payrollEntrySchema = z.object({
  id: z.string().min(1),
  staffId: z.string().min(1),
  staffName: z.string().trim().min(2),
  role: z.string().min(1),
  location: z.string().min(1),
  periodStart: z.string().date(),
  periodEnd: z.string().date(),
  hours: z.number().positive('Hours must be greater than zero.'),
  hourlyRate: z.number().positive('Hourly rate must be greater than zero.'),
  bonus: z.number().min(0, 'Bonus cannot be negative.'),
  deductions: z.number().min(0, 'Deductions cannot be negative.'),
  status: z.enum(['draft', 'approved', 'paid']),
  notes: z.string().trim().max(300),
}).refine((entry) => entry.periodEnd >= entry.periodStart, {
  message: 'Pay period end must be on or after its start.',
  path: ['periodEnd'],
});

export const payrollDataSchema = z.object({ entries: z.array(payrollEntrySchema) });
export type PayrollEntry = z.infer<typeof payrollEntrySchema>;
export type PayrollData = z.infer<typeof payrollDataSchema>;

export function getGrossPay(entry: Pick<PayrollEntry, 'hours' | 'hourlyRate' | 'bonus'>) {
  return entry.hours * entry.hourlyRate + entry.bonus;
}

export function getNetPay(entry: Pick<PayrollEntry, 'hours' | 'hourlyRate' | 'bonus' | 'deductions'>) {
  return Math.max(0, getGrossPay(entry) - entry.deductions);
}
