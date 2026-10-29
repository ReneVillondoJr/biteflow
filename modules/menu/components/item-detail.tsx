import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Leaf,
  UtensilsCrossed,
} from 'lucide-react';

import SiteFooter from '@/modules/home/components/site-footer';
import SiteHeader from '@/modules/home/components/site-header';

import type { MenuItem } from '../types/menu';

type MenuItemDetailProps = {
  item: MenuItem;
};

export default function MenuItemDetail({ item }: MenuItemDetailProps) {
  return (
    <>
      <SiteHeader />

      <main className='menu-detail-page'>
        <div className='container'>
          <Link className='menu-detail-back' href='/menu'>
            <ArrowLeft aria-hidden='true' />
            Back to the menu
          </Link>

          <div className='menu-detail-grid'>
            <div
              className='menu-detail-image'
              role='img'
              aria-label={item.name}
              style={{
                backgroundImage: `url("${item.image}")`,
              }}
            >
              {item.badge ?
                <span className='menu-detail-badge'>{item.badge}</span>
              : null}
            </div>

            <div className='menu-detail-copy'>
              <span className='section-label'>
                <span className='section-label__dot' />
                {item.category}
              </span>

              <h1 className='menu-detail-title'>{item.name}</h1>

              <p className='menu-detail-description'>{item.description}</p>

              <div className='menu-detail-price'>
                ₱{item.price.toLocaleString('en-PH')}
              </div>

              <div className='menu-detail-meta'>
                <span>
                  <Clock3 aria-hidden='true' />
                  About {item.prepTime} minutes
                </span>

                <span>
                  <UtensilsCrossed aria-hidden='true' />
                  {item.category}
                </span>
              </div>

              <div className='menu-detail-tags'>
                {item.tags.map((tag) => (
                  <span key={tag}>
                    <Leaf aria-hidden='true' />
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className={
                  item.isAvailable ?
                    'menu-detail-availability'
                  : 'menu-detail-availability menu-detail-availability--unavailable'
                }
              >
                <span className='menu-detail-status-dot' />
                {item.isAvailable ?
                  'Listed as available'
                : 'Currently unavailable'}
              </div>

              <p className='menu-detail-disclaimer'>
                Dish descriptions, availability, preparation times, and prices
                should be confirmed against the live menu before accepting an
                order.
              </p>

              <div className='menu-detail-actions'>
                <Link
                  className='button button--primary'
                  href='/menu#menu-catalog'
                >
                  Explore more dishes
                  <ArrowRight aria-hidden='true' />
                </Link>

                <Link className='button button--outline' href='/contact'>
                  Ask us a question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
