import type { ReactNode } from 'react';

import SiteHeader from '@/components/public/layout/site-header';
import SiteFooter from '@/components/public/layout/site-footer';
import { CartProvider, CartStorageNotice } from '@/modules/cart/provider';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <CartProvider>
      <SiteHeader />
      <CartStorageNotice />

      <main className='min-h-[60vh]'>{children}</main>

      <SiteFooter />
    </CartProvider>
  );
}
