import Link from 'next/link';

import { Clock3, MapPin } from 'lucide-react';

import { Brand } from '@/components/public/shared/brand';

import { publicFooterDiscover, publicFooterExplore } from './navigation';

export default function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className='site-footer'>
      <div className='container'>
        <div className='footer-main'>
          {/* Brand */}
          <div className='footer-brand'>
            <Brand />

            <p className='footer-brand-description'>
              Fresh favorites, comforting flavors, and a better way to find your
              next favorite meal. Welcome to BiteFlow.
            </p>
          </div>

          {/* Explore */}
          <div className='footer-column'>
            <h3>Explore</h3>

            <nav className='footer-links' aria-label='Explore'>
              {publicFooterExplore.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Discover */}
          <div className='footer-column'>
            <h3>Discover</h3>

            <nav className='footer-links' aria-label='Discover'>
              {publicFooterDiscover.map((item) => (
                <Link href={item.href} key={`${item.label}-${item.href}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact information */}
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

        {/* Copyright */}
        <div className='footer-bottom'>
          <span>© {currentYear} BiteFlow. All rights reserved.</span>

          <span className='footer-bottom-note'>
            Made with care for good food lovers.
          </span>
        </div>
      </div>
    </footer>
  );
}
