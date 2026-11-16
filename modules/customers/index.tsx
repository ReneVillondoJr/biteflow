'use client';

import CustomersManager from './components/customers-manager';
import { useCustomers } from './hooks/use-customers';

export default function CustomersModule() {
  const customers = useCustomers();
  return <CustomersManager customers={customers} />;
}
