import type { Metadata } from 'next';

import { AuthPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your BiteFlow customer account.',
};

export default function Page() {
  return <AuthPage mode='login' />;
}
