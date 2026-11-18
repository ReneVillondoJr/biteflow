'use client';

import StaffManager from './components/staff-manager';
import { useStaff } from './hooks/use-staff';

export default function StaffModule() {
  const staff = useStaff();
  return <StaffManager staff={staff} />;
}
