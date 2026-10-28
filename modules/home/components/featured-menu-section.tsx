'use client';

import Link from 'next/link';

import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

import { useFeaturedMenu } from '../hooks/use-featured-menu';

export default function FeaturedMenuSection() {
  const { categories, activeCategory, setActiveCategory, items } =
    useFeaturedMenu();

  return (
    <section className='section menu-section' id='menu'>
      <div className='container'>
        <div className='section-heading'>
          <div className='section-heading__content'>
            <span className='section-label'>
              <span className='section-label__dot' />
              From our kitchen
            </span>

            <h2 className='display-heading'>
              Cravings worth
              <br />
              <em>coming back for.</em>
            </h2>

            <p className='section-description'>
              Explore comforting classics and fresh favorites. Your next go-to
              meal might be just one click away.
            </p>
          </div>

          <div className='section-heading__action'>
            <Link className='text-link' href='/menu'>
              Explore the full menu
              <ArrowRight aria-hidden='true' />
            </Link>
          </div>
        </div>

        <div className='menu-category-list' aria-label='Filter featured dishes'>
          {categories.map((category) => (
            <button
              className={
                activeCategory === category.slug ?
                  'menu-category menu-category--active'
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

        <div className='dish-grid'>
          {items.map((item) => (
            <article className='dish-card' key={item.slug}>
              <Link
                className='dish-image-link'
                href={`/menu/${item.slug}`}
                aria-label={`View ${item.name}`}
              >
                <div
                  className='dish-image'
                  role='img'
                  aria-label={item.name}
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                >
                  {item.badge ?
                    <span className='dish-badge'>
                      <Sparkles aria-hidden='true' />
                      {item.badge}
                    </span>
                  : null}
                </div>
              </Link>

              <div className='dish-content'>
                <span className='dish-category'>{item.category}</span>

                <h3 className='dish-title'>{item.name}</h3>

                <p className='dish-description'>{item.description}</p>

                <div className='dish-card-footer'>
                  <span className='dish-price'>
                    ₱{item.price.toLocaleString('en-PH')}
                  </span>

                  <Link className='dish-order-link' href={`/menu/${item.slug}`}>
                    View item
                    <ArrowUpRight aria-hidden='true' />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 ?
          <p className='section-description'>
            No featured dishes are available in this category right now. Explore
            our complete menu for more choices.
          </p>
        : null}

        <div className='menu-bottom-action'>
          <Link className='button button--outline' href='/menu'>
            Discover the whole menu
            <ArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
