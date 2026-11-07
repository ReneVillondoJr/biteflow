import { Boxes } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Inventory' description='Monitor stock levels, supplies, availability, and replenishment needs.' icon={Boxes} />;
}
