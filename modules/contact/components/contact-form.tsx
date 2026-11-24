'use client';

import { useState, type FormEvent } from 'react';

import { CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectMenu } from '@/components/select';

import type { ContactTopic } from '../types/contact';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState<ContactTopic>('general');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className='py-16 md:py-24' id='contact-form'>
      <div className='mx-auto grid w-full max-w-[1200px] gap-10 px-4 md:px-6 lg:grid-cols-[.8fr_1.2fr]'>
        <div>
          <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-primary'>
            <span className='size-2 rounded-full bg-accent' />
            Send a message
          </span>
          <h2 className='mt-4 font-heading text-4xl leading-tight tracking-tight md:text-5xl'>
            How can we
            <br />
            <em>help you?</em>
          </h2>
          <p>
            Share a few details below. Our team usually replies within one
            business day.
          </p>
        </div>

        <Card className='rounded-2xl border-border p-5 shadow-sm md:p-8'>
          {submitted ? (
            <div className='contact-success' role='status'>
              <CheckCircle2 aria-hidden='true' />
              <h3>Message received</h3>
              <p>Thanks for reaching out. The BiteFlow team will be in touch soon.</p>
              <Button variant='outline' type='button' onClick={() => setSubmitted(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form className='grid gap-5' onSubmit={handleSubmit}>
              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='grid gap-2 text-xs font-bold'>
                  Your name
                  <Input name='name' required placeholder='Juan Dela Cruz' />
                </label>
                <label className='grid gap-2 text-xs font-bold'>
                  Email address
                  <Input name='email' type='email' required placeholder='juan@email.com' />
                </label>
              </div>

              <label className='grid gap-2 text-xs font-bold'>
                What is this about?
                <SelectMenu
                  label='What is this about?'
                  name='topic'
                  value={topic}
                  onChange={(value) => setTopic(value as ContactTopic)}
                  options={[{ value: 'general', label: 'General question' }, { value: 'order', label: 'An existing order' }, { value: 'feedback', label: 'Feedback' }, { value: 'partnership', label: 'Partnership' }]}
                  className='w-full'
                />
              </label>

              <label className='grid gap-2 text-xs font-bold'>
                Message
                <Textarea
                  name='message'
                  required
                  rows={6}
                  placeholder='Tell us how we can help...'
                />
              </label>

              <Button className='mt-2' type='submit'>
                Send message
                <Send aria-hidden='true' />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
