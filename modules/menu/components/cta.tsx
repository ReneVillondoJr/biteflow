import Link from 'next/link';

import { ArrowRight, Heart } from 'lucide-react';

export default function MenuCTA() {
  return (
    <section className='menu-cta-section'>
      <div className='container'>
        <div className='menu-cta-card'>
          <div className='menu-cta-icon'>
            <Heart aria-hidden='true' />
          </div>

          <div className='menu-cta-copy'>
            <span className='section-label'>
              <span className='section-label__dot' />
              Good food is for sharing
            </span>

            <h2>
              Found something
              <br />
              <em>you would love?</em>
            </h2>

            <p>
              Explore the full collection, find your favorite flavors, and make
              your next meal a little more special.
            </p>
          </div>

          <Link className='button button--primary' href='/contact'>
            Get in touch
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
