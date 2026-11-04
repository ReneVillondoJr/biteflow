'use client';

import { useState, type FormEvent } from 'react';

import { CheckCircle2, Send } from 'lucide-react';

import type { ContactTopic } from '../types/contact';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState<ContactTopic>('general');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className='section contact-form-section' id='contact-form'>
      <div className='container contact-form-grid'>
        <div className='contact-form-intro'>
          <span className='section-label'>
            <span className='section-label__dot' />
            Send a message
          </span>
          <h2 className='display-heading'>
            How can we
            <br />
            <em>help you?</em>
          </h2>
          <p>
            Share a few details below. Our team usually replies within one
            business day.
          </p>
        </div>

        <div className='contact-form-card'>
          {submitted ? (
            <div className='contact-success' role='status'>
              <CheckCircle2 aria-hidden='true' />
              <h3>Message received</h3>
              <p>Thanks for reaching out. The BiteFlow team will be in touch soon.</p>
              <button type='button' onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='contact-form-row'>
                <label>
                  Your name
                  <input name='name' required placeholder='Juan Dela Cruz' />
                </label>
                <label>
                  Email address
                  <input name='email' type='email' required placeholder='juan@email.com' />
                </label>
              </div>

              <label>
                What is this about?
                <select
                  name='topic'
                  value={topic}
                  onChange={(event) => setTopic(event.target.value as ContactTopic)}
                >
                  <option value='general'>General question</option>
                  <option value='order'>An existing order</option>
                  <option value='feedback'>Feedback</option>
                  <option value='partnership'>Partnership</option>
                </select>
              </label>

              <label>
                Message
                <textarea
                  name='message'
                  required
                  rows={6}
                  placeholder='Tell us how we can help...'
                />
              </label>

              <button className='button button--primary contact-submit' type='submit'>
                Send message
                <Send aria-hidden='true' />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
