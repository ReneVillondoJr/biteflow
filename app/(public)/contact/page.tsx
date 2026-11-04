import type { Metadata } from 'next';

import ContactPage from '@/modules/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact BiteFlow for help, feedback, partnerships, or general questions.',
};

export default function Page() {
  return <ContactPage />;
}
