'use client';

import PayrollManager from './components/payroll-manager';
import { usePayroll } from './hooks/use-payroll';
import { useStaff } from '@/modules/staff/hooks/use-staff';

export default function PayrollModule() {
  const payroll = usePayroll();
  const staff = useStaff();
  return <PayrollManager payroll={payroll} staff={staff.staff} staffHydrated={staff.hydrated} />;
}
