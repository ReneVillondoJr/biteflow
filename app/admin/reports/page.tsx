import { ChartNoAxesCombined } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';
export default function Page() {
  return <AdminModulePage title='Reports' description='Analyze revenue, orders, customers, inventory, and operational performance.' icon={ChartNoAxesCombined} />;
}
