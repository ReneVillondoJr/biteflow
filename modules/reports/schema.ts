import { z } from 'zod';

export const reportPeriodSchema = z.enum(['Today', 'Last 7 days', 'This month']);
export type ReportPeriod = z.infer<typeof reportPeriodSchema>;
export const reportPeriods: ReportPeriod[] = ['Today', 'Last 7 days', 'This month'];
