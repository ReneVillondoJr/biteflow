import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

export default function FinalCallToAction() {
  return (
    <section className='cta-section'>
      <div className='container'>
        <div className='cta-card'>
          <div className='cta-copy'>
            <span className='section-label'>
              <span className='section-label__dot' />
              Your next meal is calling
            </span>

            <h2>Something delicious starts here.</h2>

            <p>
              Take a look around, find your new favorite, and make your next
              meal a BiteFlow moment.
            </p>
          </div>

          <div className='cta-action'>
            <Link className='button button--primary' href='/menu'>
              Browse the menu
              <ArrowRight aria-hidden='true' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
