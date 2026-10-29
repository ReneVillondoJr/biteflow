import Link from 'next/link';

import { ArrowUpRight, Clock3, Sparkles } from 'lucide-react';

import type { MenuItem } from '../types/menu';

type MenuCardProps = {
  item: MenuItem;
};

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <article
      className={`menu-card${item.isAvailable ? '' : ' menu-card--unavailable'}`}
    >
      <Link
        className='menu-card-image-link'
        href={`/menu/${item.slug}`}
        aria-label={`View ${item.name}`}
      >
        <div
          className='menu-card-image'
          role='img'
          aria-label={item.name}
          style={{
            backgroundImage: `url("${item.image}")`,
          }}
        >
          {item.badge ?
            <span className='menu-card-badge'>
              <Sparkles aria-hidden='true' />
              {item.badge}
            </span>
          : null}

          {!item.isAvailable ?
            <span className='menu-card-unavailable-label'>
              Currently unavailable
            </span>
          : null}
        </div>
      </Link>

      <div className='menu-card-content'>
        <div className='menu-card-meta'>
          <span className='menu-card-category'>{item.category}</span>

          <span className='menu-card-time'>
            <Clock3 aria-hidden='true' />
            {item.prepTime} min
          </span>
        </div>

        <h2 className='menu-card-title'>
          <Link href={`/menu/${item.slug}`}>{item.name}</Link>
        </h2>

        <p className='menu-card-description'>{item.description}</p>

        <div className='menu-card-tags'>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className='menu-card-footer'>
          <span className='menu-card-price'>
            ₱{item.price.toLocaleString('en-PH')}
          </span>

          <Link className='menu-card-action' href={`/menu/${item.slug}`}>
            View dish
            <ArrowUpRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </article>
  );
}
