import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';

import { Clock3, MapPin } from 'lucide-react';

import { homeContent } from '../data/home';

import { Brand } from './brand';

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export default function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div className='container'>
        <div className='footer-main'>
          <div className='footer-brand'>
            <Brand />

            <p className='footer-brand-description'>
              Fresh favorites, comforting flavors, and a better way to find your
              next favorite meal. Welcome to BiteFlow.
            </p>
          </div>

          <div className='footer-column'>
            <h3>Explore</h3>

            <nav className='footer-links' aria-label='Explore'>
              {homeContent.restaurantLinks.map((item) => (
                <Link href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className='footer-column'>
            <h3>Discover</h3>

            <nav className='footer-links' aria-label='Discover'>
              {homeContent.exploreLinks.map((item) => (
                <Link href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}

              <Link href='/account'>My account</Link>
            </nav>
          </div>

          <div className='footer-column'>
            <h3>Come say hello</h3>

            <div className='footer-contact'>
              <div className='footer-contact-item'>
                <MapPin aria-hidden='true' />
                <span>
                  Visit our locations page for restaurant information and
                  directions.
                </span>
              </div>

              <div className='footer-contact-item'>
                <Clock3 aria-hidden='true' />
                <span>Check our published opening hours before visiting.</span>
              </div>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>
          <span>
            ©{' '}
            <Suspense fallback='2026'>
              <CurrentYear />
            </Suspense>{' '}
            BiteFlow. All rights reserved.
          </span>

          <span className='footer-bottom-note'>
            Made with care for good food lovers.
          </span>
        </div>
      </div>
    </footer>
  );
}
