'use client';

import Link from 'next/link';

import { ArrowUpRight, Clock3 } from 'lucide-react';

import { useOffers } from '../hooks/use-offers';
import type { OffersData } from '../types/offers';

type GridProps = {
  data: OffersData;
};

export default function Grid({ data }: GridProps) {
  const { categories, activeCategory, setActiveCategory, filteredOffers } =
    useOffers(data.categories, data.offers);

  return (
    <section className='section offers-section' id='featured-offers'>
      <div className='container'>
        <div className='offers-heading'>
          <div>
            <h2 className='display-heading'>
              Today’s good
              <br />
              <em>food finds.</em>
            </h2>
          </div>

          <p>
            Limited combinations, straightforward savings, and dishes selected
            for sharing or enjoying at your own pace.
          </p>
        </div>

        <div className='offers-filter-list' aria-label='Filter offers'>
          {categories.map((category) => (
            <button
              className={
                activeCategory === category.slug
                  ? 'menu-category menu-category--active'
                  : 'menu-category'
              }
              type='button'
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              aria-pressed={activeCategory === category.slug}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className='offers-grid'>
          {filteredOffers.map((offer) => (
            <article className={`offer-card offer-card--${offer.theme}`} key={offer.title}>
              <Link className='offer-card-image-link' href={offer.href} aria-label={`View ${offer.title}`}>
                <div
                  className='offer-card-image'
                  role='img'
                  aria-label={offer.title}
                  style={{ backgroundImage: `url("${offer.image}")` }}
                >
                  <span>Save ₱{offer.saving.toLocaleString('en-PH')}</span>
                </div>
              </Link>

              <div className='offer-card-content'>
                <span className='offer-card-label'>{offer.label}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>

                <div className='offer-card-availability'>
                  <Clock3 aria-hidden='true' />
                  {offer.availability}
                </div>

                <div className='offer-card-footer'>
                  <strong>₱{offer.price.toLocaleString('en-PH')}</strong>
                  <Link href={offer.href}>
                    View offer
                    <ArrowUpRight aria-hidden='true' />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
