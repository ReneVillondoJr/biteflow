import type { Metadata } from 'next';

import AdminLogin from '@/modules/auth/components/admin-login';

export const metadata: Metadata = {
  title: 'Admin Sign In',
  description: 'Secure administrator sign in for BiteFlow.',
};

export default function Page() {
  return <AdminLogin />;
}
