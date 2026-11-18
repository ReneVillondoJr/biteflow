import { z } from 'zod';

export const staffMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(2, 'Enter the staff member’s name.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(24),
  role: z.enum(['manager', 'supervisor', 'cashier', 'cook', 'server', 'delivery']),
  shift: z.enum(['morning', 'afternoon', 'evening', 'flexible']),
  location: z.string().trim().min(2, 'Enter a work location.').max(80),
  status: z.enum(['active', 'on-leave', 'inactive']),
  hiredAt: z.string().date(),
  permissions: z.array(z.enum(['orders', 'menu', 'inventory', 'reports', 'staff'])).max(5),
  notes: z.string().trim().max(500),
});

export const staffDataSchema = z.object({ staff: z.array(staffMemberSchema) }).superRefine(({ staff }, context) => {
  const emails = new Set<string>();
  staff.forEach((member, index) => {
    const email = member.email.trim().toLowerCase();
    if (emails.has(email)) context.addIssue({ code: 'custom', message: 'Staff email addresses must be unique.', path: ['staff', index, 'email'] });
    emails.add(email);
  });
});

export type StaffMember = z.infer<typeof staffMemberSchema>;
export type StaffData = z.infer<typeof staffDataSchema>;
