import { ReceiptText } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';

export default function Page() {
  return <AdminModulePage title='Orders' description='Search, review, update, and fulfill all customer orders.' icon={ReceiptText} />;
}
