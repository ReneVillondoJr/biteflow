'use client';

import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/modules/cart/provider';

type AddToCartButtonProps = {
  slug: string;
  available: boolean;
  className?: string;
  showAddedLabel?: boolean;
};

export default function AddToCartButton({
  slug,
  available,
  className,
  showAddedLabel = false,
}: AddToCartButtonProps) {
  const { addItem, hydrated } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      type='button'
      disabled={!available || !hydrated}
      className={className}
      onClick={() => {
        addItem(slug);
        setAdded(true);
      }}
      aria-label={available ? 'Add item to cart' : 'Item unavailable'}
    >
      {added ?
        <Check aria-hidden='true' />
      : <Plus aria-hidden='true' />}
      {added && showAddedLabel ?
        'Added — add another'
      : 'Add to cart'}
    </Button>
  );
}
