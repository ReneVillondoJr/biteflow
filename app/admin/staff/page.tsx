import { Users } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';
export default function Page() {
  return <AdminModulePage title='Staff' description='Manage team members, roles, shifts, permissions, and staffing status.' icon={Users} />;
}
