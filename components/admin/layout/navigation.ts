import {
  Activity,
  Boxes,
  ChefHat,
  LayoutDashboard,
  Menu as MenuIcon,
  PackageCheck,
  ReceiptText,
  Settings,
  Store,
  Truck,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  mobile?: boolean;
};

export type AdminNavigationGroup = {
  label: string;
  items: AdminNavigationItem[];
};

export const adminNavigationGroups: AdminNavigationGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, mobile: true },
      { label: 'Orders', href: '/admin/orders', icon: ReceiptText, mobile: true },
      { label: 'Kitchen', href: '/admin/kitchen', icon: ChefHat },
      { label: 'Delivery', href: '/admin/delivery', icon: Truck },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Menu', href: '/admin/menu', icon: MenuIcon, mobile: true },
      { label: 'Inventory', href: '/admin/inventory', icon: Boxes, mobile: true },
      { label: 'Promotions', href: '/admin/promotions', icon: Activity },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: Users, mobile: true },
      { label: 'Payments', href: '/admin/payments', icon: WalletCards },
      { label: 'Staff', href: '/admin/staff', icon: Users },
      { label: 'Payroll', href: '/admin/payroll', icon: PackageCheck },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Reports', href: '/admin/reports', icon: Store },
      { label: 'Activity logs', href: '/admin/activity-logs', icon: Activity },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];
