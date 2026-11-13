'use client';

import Link from 'next/link';

import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from './provider';
import { formatCartPrice } from './format';

export default function CartModule() {
  const {
    items,
    itemCount,
    subtotal,
    hydrated,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (!hydrated) {
    return (
      <section className='mx-auto min-h-[50vh] max-w-[1100px] px-4 py-16 md:px-6'>
        <p role='status'>Loading your cart…</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className='mx-auto grid min-h-[55vh] max-w-[1100px] place-content-center justify-items-center px-4 py-16 text-center md:px-6'>
        <ShoppingBag className='mb-4 size-10 text-primary' aria-hidden='true' />
        <h1 className='font-heading text-4xl'>Your cart is waiting</h1>
        <p className='mt-3 max-w-md text-muted-foreground'>
          Browse the menu and add a few favorites to get started.
        </p>
        <Button render={<Link href='/menu#menu-catalog' />} className='mt-6'>
          Browse the menu
          <ArrowRight aria-hidden='true' />
        </Button>
      </section>
    );
  }

  return (
    <section className='mx-auto min-h-[60vh] max-w-[1100px] px-4 py-12 md:px-6 md:py-16'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <span className='text-xs font-bold uppercase tracking-widest text-primary'>
            Your order
          </span>
          <h1 className='mt-2 font-heading text-4xl md:text-5xl'>Your cart</h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>
        <Button type='button' variant='ghost' onClick={clearCart}>
          <Trash2 aria-hidden='true' />
          Clear cart
        </Button>
      </div>

      <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_340px]'>
        <div className='grid content-start gap-4'>
          {items.map(({ item, quantity, lineTotal }) => (
            <article
              className='flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center'
              key={item.slug}
            >
              <div
                className='h-36 rounded-xl bg-cover bg-center sm:h-28 sm:w-36 sm:shrink-0'
                role='img'
                aria-label={item.name}
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className='min-w-0 flex-1'>
                <p className='text-xs font-bold text-primary'>{item.category}</p>
                <h2 className='mt-1 text-lg font-bold'>{item.name}</h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {formatCartPrice(item.price)} each
                </p>
                {!item.isAvailable ?
                  <p className='mt-1 text-xs font-semibold text-destructive'>
                    This dish is no longer available. Remove it to continue.
                  </p>
                : null}
                <div className='mt-3 flex items-center gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon-sm'
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(item.slug, quantity - 1)}
                  >
                    <Minus aria-hidden='true' />
                  </Button>
                  <span className='min-w-8 text-center' aria-live='polite'>
                    {quantity}
                  </span>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon-sm'
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => setQuantity(item.slug, quantity + 1)}
                  >
                    <Plus aria-hidden='true' />
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='ml-2'
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 aria-hidden='true' />
                    Remove
                  </Button>
                </div>
              </div>
              <strong className='shrink-0 text-lg'>
                {formatCartPrice(lineTotal)}
              </strong>
            </article>
          ))}
        </div>

        <aside className='h-fit rounded-2xl border border-border bg-card p-5'>
          <h2 className='text-lg font-bold'>Order summary</h2>
          <div className='mt-5 flex justify-between text-sm'>
            <span className='text-muted-foreground'>Subtotal</span>
            <span>{formatCartPrice(subtotal)}</span>
          </div>
          <p className='mt-3 text-xs leading-5 text-muted-foreground'>
            Delivery fees and final availability are confirmed when your order
            is accepted.
          </p>
          <Button
            render={<Link href='/checkout' />}
            className='mt-6 w-full'
            disabled={items.some(({ item }) => !item.isAvailable)}
          >
            Continue to checkout
            <ArrowRight aria-hidden='true' />
          </Button>
          <Link
            className='mt-4 block text-center text-sm font-semibold text-primary hover:underline'
            href='/menu#menu-catalog'
          >
            Continue browsing
          </Link>
        </aside>
      </div>
    </section>
  );
}