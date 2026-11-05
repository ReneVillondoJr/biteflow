import type { Metadata } from 'next';

import { AccountPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'View your BiteFlow account and recent orders.',
};

export default function Page() {
  return <AccountPage />;
}
