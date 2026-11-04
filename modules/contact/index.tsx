'use client';

import ContactDetails from './components/contact-details';
import ContactForm from './components/contact-form';
import ContactHero from './components/contact-hero';
import { contactData } from './data/contact';

export default function ContactPage() {
  return (
    <div className='contact-page'>
      <ContactHero data={contactData} />
      <ContactDetails details={contactData.details} />
      <ContactForm />
    </div>
  );
}
