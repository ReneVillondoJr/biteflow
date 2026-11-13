'use client';

import MenuManager from './components/menu-manager';
import { useAdminMenu } from './hooks/use-admin-menu';

export default function AdminMenuModule() {
  const menu = useAdminMenu();

  return <MenuManager menu={menu} />;
}
