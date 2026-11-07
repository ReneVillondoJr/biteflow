import { Activity } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Activity Logs' description='Review secure administrator actions, changes, and operational events.' icon={Activity} />;
}
