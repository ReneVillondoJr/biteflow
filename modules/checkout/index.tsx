'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCartPrice } from '@/modules/cart/format';
import { useCart } from '@/modules/cart/provider';

type CheckoutReceipt = {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; lineTotal: number }>;
  subtotal: number;
};

export default function CheckoutModule() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>(
    'delivery',
  );
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<CheckoutReceipt | null>(null);

  function completeDemoOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get('name') ?? '').trim();

    if (!customerName || items.length === 0) {
      setError('Enter your name and make sure your cart has at least one item.');
      return;
    }

    setReceipt({
      orderNumber: `BF-${Date.now().toString().slice(-6)}`,
      customerName,
      items: items.map(({ item, quantity, lineTotal }) => ({
        name: item.name,
        quantity,
        lineTotal,
      })),
      subtotal,
    });
    clearCart();
    setError(null);
  }

  if (!hydrated) {
    return (
      <section className='mx-auto min-h-[50vh] max-w-[1100px] px-4 py-16 md:px-6'>
        <p role='status'>Loading checkout…</p>
      </section>
    );
  }

  if (receipt) {
    return (
      <section className='mx-auto grid min-h-[60vh] max-w-[700px] content-center px-4 py-12 md:px-6'>
        <div className='rounded-2xl border border-border bg-card p-6 text-center sm:p-10'>
          <CheckCircle2
            className='mx-auto size-12 text-primary'
            aria-hidden='true'
          />
          <p className='mt-5 text-xs font-bold uppercase tracking-widest text-primary'>
            Demo checkout complete
          </p>
          <h1 className='mt-2 font-heading text-4xl'>
            Thanks, {receipt.customerName}!
          </h1>
          <p className='mt-3 text-sm text-muted-foreground'>
            Your demo order summary is ready. This site does not send orders to
            a restaurant or process payments.
          </p>
          <p className='mt-6 rounded-xl bg-muted p-3 text-sm'>
            Reference: <strong>{receipt.orderNumber}</strong>
          </p>
          <div className='mt-5 space-y-3 text-left'>
            {receipt.items.map((line) => (
              <div
                className='flex justify-between gap-4 text-sm'
                key={line.name}
              >
                <span>
                  {line.quantity} × {line.name}
                </span>
                <span>{formatCartPrice(line.lineTotal)}</span>
              </div>
            ))}
            <div className='flex justify-between border-t border-border pt-3 font-bold'>
              <span>Subtotal</span>
              <span>{formatCartPrice(receipt.subtotal)}</span>
            </div>
          </div>
          <Button render={<Link href='/menu#menu-catalog' />} className='mt-7'>
            Back to the menu
            <ArrowRight aria-hidden='true' />
          </Button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className='mx-auto grid min-h-[55vh] max-w-[700px] place-content-center justify-items-center px-4 py-16 text-center md:px-6'>
        <h1 className='font-heading text-4xl'>Your cart is empty</h1>
        <p className='mt-3 text-muted-foreground'>
          Add a dish from the menu before checking out.
        </p>
        <Button
          render={<Link href='/menu#menu-catalog' />}
          className='mt-6'
        >
          Browse the menu
          <ArrowRight aria-hidden='true' />
        </Button>
      </section>
    );
  }

  return (
    <section className='mx-auto min-h-[60vh] max-w-[1100px] px-4 py-12 md:px-6 md:py-16'>
      <Link
        className='inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary'
        href='/cart'
      >
        <ArrowLeft className='size-4' aria-hidden='true' />
        Back to cart
      </Link>
      <h1 className='mt-4 font-heading text-4xl md:text-5xl'>Checkout</h1>
      <p className='mt-2 text-sm text-muted-foreground'>
        Review your details and prepare a demo order summary.
      </p>

      <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_340px]'>
        <form
          className='grid content-start gap-5 rounded-2xl border border-border bg-card p-5 sm:p-7'
          onSubmit={completeDemoOrder}
        >
          <h2 className='text-xl font-bold'>Your details</h2>
          <label className='grid gap-2 text-sm font-semibold' htmlFor='name'>
            Full name
            <Input id='name' name='name' autoComplete='name' required />
          </label>
          <label className='grid gap-2 text-sm font-semibold' htmlFor='phone'>
            Phone number
            <Input
              id='phone'
              name='phone'
              type='tel'
              autoComplete='tel'
              required
            />
          </label>
          <label
            className='grid gap-2 text-sm font-semibold'
            htmlFor='fulfillment'
          >
            Order type
            <select
              id='fulfillment'
              name='fulfillment'
              value={fulfillment}
              onChange={(event) =>
                setFulfillment(
                  event.target.value === 'pickup' ? 'pickup' : 'delivery',
                )
              }
              className='h-10 rounded-lg border border-input bg-background px-3 text-sm'
            >
              <option value='delivery'>Delivery</option>
              <option value='pickup'>Pickup</option>
            </select>
          </label>
          {fulfillment === 'delivery' ?
            <label
              className='grid gap-2 text-sm font-semibold'
              htmlFor='address'
            >
              Delivery address
              <Input
                id='address'
                name='address'
                autoComplete='street-address'
                required
              />
            </label>
          : null}
          <label className='grid gap-2 text-sm font-semibold' htmlFor='notes'>
            Order notes{' '}
            <span className='font-normal text-muted-foreground'>Optional</span>
            <textarea
              id='notes'
              name='notes'
              rows={3}
              className='rounded-lg border border-input bg-background px-3 py-2 text-sm'
            />
          </label>
          {error ?
            <p className='text-sm text-destructive' role='alert'>
              {error}
            </p>
          : null}
          <p className='text-xs leading-5 text-muted-foreground'>
            Demo only: no order is submitted, no payment is collected, and no
            personal details are stored.
          </p>
          <Button type='submit' className='w-full'>
            Complete demo order
            <ArrowRight aria-hidden='true' />
          </Button>
        </form>

        <aside className='h-fit rounded-2xl border border-border bg-card p-5'>
          <h2 className='text-lg font-bold'>Order summary</h2>
          <div className='mt-5 space-y-4'>
            {items.map(({ item, quantity, lineTotal }) => (
              <div
                className='flex justify-between gap-4 text-sm'
                key={item.slug}
              >
                <span>
                  {quantity} × {item.name}
                </span>
                <span className='shrink-0'>{formatCartPrice(lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className='mt-5 flex justify-between border-t border-border pt-4 font-bold'>
            <span>Subtotal</span>
            <span>{formatCartPrice(subtotal)}</span>
          </div>
          <p className='mt-3 text-xs leading-5 text-muted-foreground'>
            Delivery fees are not included in this demo.
          </p>
        </aside>
      </div>
    </section>
  );
}