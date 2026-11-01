import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

const promotions = [
  {
    eyebrow: 'Fresh start',
    title: 'A lighter lunch, made easy.',
    description: 'Fresh Garden Bowl - ₱229.',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1100&q=85',
    href: '/menu/fresh-garden-rice-bowl',
    label: 'Explore rice bowls',
    theme: 'green',
  },
  {
    eyebrow: 'Sweet finish',
    title: 'Make room for something good.',
    description: 'Classic Cheesecake - ₱149.',
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1100&q=85',
    href: '/menu/classic-cheesecake',
    label: 'Explore desserts',
    theme: 'gold',
  },
];

export default function PromotionsSection() {
  return (
    <section className='home-promotions' aria-label='Featured promotions'>
      <div className='container home-promotions-grid'>
        {promotions.map((promotion) => (
          <article
            className={`home-promo-card home-promo-card--${promotion.theme}`}
            key={promotion.title}
          >
            <div
              className='home-promo-image'
              role='img'
              aria-label={promotion.title}
              style={{ backgroundImage: `url("${promotion.image}")` }}
            />

            <div className='home-promo-overlay' />

            <div className='home-promo-copy'>
              <span>{promotion.eyebrow}</span>
              <h2>{promotion.title}</h2>
              <p>{promotion.description}</p>

              <Link href={promotion.href}>
                {promotion.label}
                <ArrowUpRight aria-hidden='true' />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
