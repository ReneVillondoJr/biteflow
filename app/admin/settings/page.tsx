import { Settings } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';
export default function Page() {
  return <AdminModulePage title='Settings' description='Configure restaurant details, notifications, security, and system preferences.' icon={Settings} />;
}
