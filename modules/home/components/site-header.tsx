import Link from 'next/link';

import { ArrowUpRight, Menu as MenuIcon, ShoppingBag } from 'lucide-react';

import { homeContent } from '../data/home';
import { Brand } from './brand';

export default function SiteHeader() {
  const desktopLinks = homeContent.restaurantLinks.filter(
    (item) => item.href !== '/',
  );

  return (
    <header className='site-header'>
      <div className='container header-inner'>
        <Brand />

        <nav className='desktop-nav' aria-label='Main navigation'>
          {desktopLinks.map((item) => (
            <Link href={item.href} key={item.label}>
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
            <summary aria-label='Open navigation'>
              <MenuIcon aria-hidden='true' />
            </summary>

            <nav className='mobile-menu-panel' aria-label='Mobile navigation'>
              {homeContent.restaurantLinks.map((item) => (
                <Link href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}

              <Link href='/reservations'>Reservations</Link>
              <Link href='/auth/login'>My account</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
