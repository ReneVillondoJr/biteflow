'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRight, Menu as MenuIcon, ShoppingBag, UserRound } from 'lucide-react';

import { Brand } from '@/components/public/shared/brand';
import { Button } from '@/components/ui/button';
import { useCart } from '@/modules/cart/provider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { publicHeaderNavigation, publicMobileNavigation } from './navigation';

export default function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  function isActive(href: string) {
    const routePath = href.split('#')[0];

    if (routePath === '/') {
      return pathname === '/';
    }

    return pathname === routePath || pathname.startsWith(`${routePath}/`);
  }

  return (
    <header className='sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl'>
      <div className='mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-4 md:px-8'>
        <Brand />

        <nav className='hidden items-center gap-1 lg:flex' aria-label='Main navigation'>
          {publicHeaderNavigation.map((item) => (
            <Link
              className={`rounded-full px-3.5 py-2.5 text-xs font-semibold transition-colors hover:bg-muted ${isActive(item.href) ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground'}`}
              href={item.href}
              key={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <Link
            className='relative flex size-10 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground transition-colors hover:bg-muted'
            href='/cart'
            aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            aria-current={pathname === '/cart' ? 'page' : undefined}
            title='Shopping cart'
          >
            <ShoppingBag aria-hidden='true' />
            {itemCount > 0 ?
              <span className='absolute -right-1 -top-1 grid min-h-5 min-w-5 place-content-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground'>
                {itemCount}
              </span>
            : null}
          </Link>

          <Link
            className={
              `flex size-10 items-center justify-center rounded-xl border border-border/80 bg-card transition-colors hover:bg-muted ${pathname === '/account' || pathname.startsWith('/auth/') ? 'text-primary' : 'text-muted-foreground'}`
            }
            href='/account'
            aria-label='My account'
            aria-current={pathname === '/account' || pathname.startsWith('/auth/') ? 'page' : undefined}
            title='My account'
          >
            <UserRound aria-hidden='true' />
          </Link>

          <Link className='hidden items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:flex' href='/menu#menu-catalog'>
            <ShoppingBag aria-hidden='true' />

            <span>Order online</span>

            <ArrowUpRight aria-hidden='true' />
          </Link>

          <Sheet>
            <SheetTrigger
              render={<Button variant='outline' size='icon' className='lg:hidden' />}
              aria-label='Open navigation menu'
            >
              <MenuIcon aria-hidden='true' />
            </SheetTrigger>
            <SheetContent side='right' className='w-[min(88vw,360px)] bg-background p-6'>
              <Brand />
              <nav className='mt-6 grid gap-1' aria-label='Mobile navigation'>
              {publicMobileNavigation.map((item) => (
                <Link
                  className={`rounded-lg px-3 py-3 text-sm font-bold ${isActive(item.href) ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                  href={item.href}
                  key={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
