import { PackageCheck } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';
export default function Page() {
  return <AdminModulePage title='Payroll' description='Manage employee compensation, pay periods, deductions, and payroll history.' icon={PackageCheck} />;
}
