export type PublicNavigationItem = {
  label: string;
  href: string;
};

export const publicHeaderNavigation: PublicNavigationItem[] = [
  { label: 'Menu', href: '/menu' },
  { label: 'Offers', href: '/offers' },
  { label: 'Our story', href: '/about' },
  { label: 'Locations', href: '/locations' },
  { label: 'Contact', href: '/contact' },
];

export const publicMobileNavigation: PublicNavigationItem[] = [
  { label: 'Home', href: '/' },
  ...publicHeaderNavigation,
  { label: 'Reservations', href: '/reservations' },
  { label: 'My account', href: '/auth/login' },
];

export const publicFooterExplore: PublicNavigationItem[] = [
  { label: 'Home', href: '/' },
  ...publicHeaderNavigation,
];

export const publicFooterDiscover: PublicNavigationItem[] = [
  { label: 'Full menu', href: '/menu' },
  { label: 'Special offers', href: '/offers' },
  { label: 'Order online', href: '/menu' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'My account', href: '/auth/login' },
];
