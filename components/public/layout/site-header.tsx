'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRight, Menu as MenuIcon, ShoppingBag } from 'lucide-react';

import { Brand } from '@/components/public/shared/brand';

import { publicHeaderNavigation, publicMobileNavigation } from './navigation';

export default function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    const routePath = href.split('#')[0];

    if (routePath === '/') {
      return pathname === '/';
    }

    return pathname === routePath || pathname.startsWith(`${routePath}/`);
  }

  return (
    <header className='site-header'>
      <div className='container header-inner'>
        <Brand />

        <nav className='desktop-nav' aria-label='Main navigation'>
          {publicHeaderNavigation.map((item) => (
            <Link
              className={isActive(item.href) ? 'desktop-nav-link--active' : undefined}
              href={item.href}
              key={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='header-actions'>
          <Link className='header-order' href='/menu#menu-catalog'>
            <ShoppingBag aria-hidden='true' />

            <span>Order online</span>

            <ArrowUpRight aria-hidden='true' />
          </Link>

          <details className='mobile-nav'>
            <summary aria-label='Open navigation menu'>
              <MenuIcon aria-hidden='true' />
            </summary>

            <nav className='mobile-menu-panel' aria-label='Mobile navigation'>
              {publicMobileNavigation.map((item) => (
                <Link
                  className={isActive(item.href) ? 'mobile-nav-link--active' : undefined}
                  href={item.href}
                  key={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
