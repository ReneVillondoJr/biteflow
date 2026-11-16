import { z } from 'zod';

export const customerSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(2, 'Enter the customer’s name.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(24),
  joinedAt: z.string().date(),
  status: z.enum(['active', 'inactive']),
  tier: z.enum(['regular', 'vip']),
  preferredContact: z.enum(['email', 'sms', 'phone']),
  notes: z.string().trim().max(500),
  ordersCount: z.number().int().nonnegative(),
  lifetimeValue: z.number().nonnegative(),
});

export const customersDataSchema = z.object({ customers: z.array(customerSchema) }).superRefine(({ customers }, context) => {
  const emails = new Set<string>();
  customers.forEach((customer, index) => {
    const email = customer.email.trim().toLowerCase();
    if (emails.has(email)) context.addIssue({ code: 'custom', message: 'Customer emails must be unique.', path: ['customers', index, 'email'] });
    emails.add(email);
  });
});

export type Customer = z.infer<typeof customerSchema>;
export type CustomersData = z.infer<typeof customersDataSchema>;
