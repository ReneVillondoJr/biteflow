import type { Metadata } from 'next';

import { AuthPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a BiteFlow customer account.',
};

export default function Page() {
  return <AuthPage mode='register' />;
}
