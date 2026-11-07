import { Menu } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Menu Management' description='Create dishes, update prices, categories, availability, and featured items.' icon={Menu} />;
}
