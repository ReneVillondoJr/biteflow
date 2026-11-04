import { contactDataSchema } from '../schema';

export const contactData = contactDataSchema.parse({
  eyebrow: 'Contact BiteFlow',
  title: 'We are here to',
  highlight: 'help.',
  description:
    'Questions about an order, feedback for the team, or an idea for a partnership. Send us a message and we will get back to you.',
  details: [
    {
      title: 'Call us',
      value: '(02) 8123-4567',
      action: 'tel:+63281234567',
      icon: 'phone',
    },
    {
      title: 'Email us',
      value: 'hello@biteflow.com',
      action: 'mailto:hello@biteflow.com',
      icon: 'mail',
    },
    {
      title: 'Support hours',
      value: 'Daily, 9:00 AM–9:00 PM',
      action: '#contact-form',
      icon: 'clock',
    },
  ],
});
