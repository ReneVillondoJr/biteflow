import { WalletCards } from 'lucide-react';
import AdminModulePage from '@/components/admin/shared/module-page';
export default function Page() {
  return <AdminModulePage title='Payments' description='Review transactions, payment status, refunds, and settlement activity.' icon={WalletCards} />;
}
