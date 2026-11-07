import { Truck } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Delivery' description='Track active riders, delivery progress, routes, and customer handoffs.' icon={Truck} />;
}
