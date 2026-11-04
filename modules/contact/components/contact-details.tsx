import { Clock3, Mail, Phone } from 'lucide-react';

import type { ContactDetail } from '../types/contact';

const icons = {
  phone: Phone,
  mail: Mail,
  clock: Clock3,
};

type ContactDetailsProps = {
  details: ContactDetail[];
};

export default function ContactDetails({ details }: ContactDetailsProps) {
  return (
    <section className='contact-details-section' aria-label='Contact information'>
      <div className='container'>
        <div className='contact-details-grid'>
          {details.map((detail) => {
            const Icon = icons[detail.icon];

            return (
              <a className='contact-detail-card' href={detail.action} key={detail.title}>
                <span className='contact-detail-icon'>
                  <Icon aria-hidden='true' />
                </span>
                <span>
                  <small>{detail.title}</small>
                  <strong>{detail.value}</strong>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
