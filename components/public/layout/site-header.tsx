import Link from 'next/link';

import { ArrowUpRight, Menu as MenuIcon, ShoppingBag } from 'lucide-react';

import { Brand } from '@/components/public/shared/brand';

import { publicHeaderNavigation, publicMobileNavigation } from './navigation';

export default function SiteHeader() {
  return (
    <header className='site-header'>
      <div className='container header-inner'>
        <Brand />

        <nav className='desktop-nav' aria-label='Main navigation'>
          {publicHeaderNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='header-actions'>
          <Link className='header-order' href='/menu'>
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
                <Link href={item.href} key={item.href}>
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
