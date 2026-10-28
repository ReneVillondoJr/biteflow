import Link from 'next/link';

import {
  ArrowRight,
  PackageCheck,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

import type { HomeOrderingStep } from '../types/home';

import { homeContent } from '../data/home';

const orderingIcons: Record<HomeOrderingStep['icon'], LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'utensils-crossed': UtensilsCrossed,
  'package-check': PackageCheck,
};

export default function OrderingSection() {
  return (
    <section className='section process-section'>
      <div className='container'>
        <div className='section-heading'>
          <div className='section-heading__content'>
            <span className='section-label'>
              <span className='section-label__dot' />
              Easy as it should be
            </span>

            <h2 className='display-heading'>
              From craving to
              <br />
              <em>your table.</em>
            </h2>

            <p className='section-description'>
              Great food should be easy to enjoy. Here is how your BiteFlow
              order comes together.
            </p>
          </div>

          <div className='section-heading__action'>
            <Link className='text-link' href='/menu'>
              Start an order
              <ArrowRight aria-hidden='true' />
            </Link>
          </div>
        </div>

        <div className='process-grid'>
          {homeContent.orderingSteps.map((step) => {
            const Icon = orderingIcons[step.icon];

            return (
              <article className='process-card' key={step.number}>
                <div className='process-card-top'>
                  <span className='process-icon'>
                    <Icon aria-hidden='true' />
                  </span>

                  <span className='process-number'>{step.number}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
