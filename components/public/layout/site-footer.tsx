import Link from 'next/link';

import { Clock3, MapPin } from 'lucide-react';

import { Brand } from '@/components/public/shared/brand';

import { publicFooterDiscover, publicFooterExplore } from './navigation';

export default function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className='border-t border-border bg-card'>
      <div className='mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6'>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]'>
          {/* Brand */}
          <div>
            <Brand />

            <p className='mt-4 max-w-sm text-xs leading-6 text-muted-foreground'>
              Fresh favorites, comforting flavors, and a better way to find your
              next favorite meal. Welcome to BiteFlow.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className='text-xs font-black uppercase tracking-wider text-primary'>Explore</h3>

            <nav className='footer-links' aria-label='Explore'>
              {publicFooterExplore.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Discover */}
          <div>
            <h3 className='text-xs font-black uppercase tracking-wider text-primary'>Discover</h3>

            <nav className='mt-4 grid gap-2 text-xs text-muted-foreground' aria-label='Discover'>
              {publicFooterDiscover.map((item) => (
                <Link href={item.href} key={`${item.label}-${item.href}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact information */}
          <div>
            <h3 className='text-xs font-black uppercase tracking-wider text-primary'>Come say hello</h3>

            <div className='mt-4 grid gap-3 text-xs text-muted-foreground'>
              <div className='flex gap-2'>
                <MapPin aria-hidden='true' />

                <span>
                  Visit our locations page for restaurant information and
                  directions.
                </span>
              </div>

              <div className='flex gap-2'>
                <Clock3 aria-hidden='true' />

                <span>Check our published opening hours before visiting.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-10 flex flex-col gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground sm:flex-row sm:justify-between'>
          <span>© {currentYear} BiteFlow. All rights reserved.</span>

          <span>
            Made with care for good food lovers.
          </span>
        </div>
      </div>
    </footer>
  );
}
