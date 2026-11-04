import { Mail } from 'lucide-react';

import type { ContactData } from '../types/contact';

type ContactHeroProps = {
  data: ContactData;
};

export default function ContactHero({ data }: ContactHeroProps) {
  return (
    <section className='contact-hero'>
      <div className='container contact-hero-grid'>
        <div className='contact-hero-copy'>
          <div className='hero-eyebrow'>
            <Mail aria-hidden='true' />
            <span>{data.eyebrow}</span>
          </div>
          <h1>
            {data.title}
            <br />
            <em>{data.highlight}</em>
          </h1>
          <p>{data.description}</p>
        </div>
      </div>
    </section>
  );
}
