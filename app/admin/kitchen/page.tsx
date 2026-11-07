import { ChefHat } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Kitchen' description='Coordinate incoming orders, preparation status, and kitchen workflow.' icon={ChefHat} />;
}
