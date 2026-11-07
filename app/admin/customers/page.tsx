import { Users } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Customers' description='Manage customer profiles, preferences, orders, and account activity.' icon={Users} />;
}
