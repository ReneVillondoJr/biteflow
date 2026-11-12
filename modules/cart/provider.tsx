'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { menuItems } from '@/modules/menu/data/menu';

import { cartSchema, type CartLine } from './schema';

const cartStorageKey = 'biteflow_cart';

type CartItem = {
  slug: string;
  quantity: number;
  item: (typeof menuItems)[number];
  lineTotal: number;
};

type CartSnapshot = {
  lines: CartLine[];
  hydrated: boolean;
  storageError: string | null;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  storageError: string | null;
  addItem: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const initialSnapshot: CartSnapshot = {
  lines: [],
  hydrated: false,
  storageError: null,
};

let snapshot = initialSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return initialSnapshot;
}

function publish(nextSnapshot: CartSnapshot) {
  snapshot = nextSnapshot;
  listeners.forEach((listener) => listener());
}

function initializeCart() {
  if (snapshot.hydrated) {
    return;
  }

  let lines: CartLine[] = [];
  let storageError: string | null = null;

  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);

    if (savedCart) {
      const parsedCart: unknown = JSON.parse(savedCart);
      const result = cartSchema.safeParse(parsedCart);

      if (!result.success) {
        throw new Error('Saved cart data is invalid.');
      }

      lines = result.data.filter((line) =>
        menuItems.some((item) => item.slug === line.slug),
      );

      if (lines.length !== result.data.length) {
        storageError =
          'Some saved items are no longer on the menu. Review your cart before checkout.';
      }
    }
  } catch {
    storageError =
      'Your saved cart could not be loaded. Add items again to start a new cart.';
  }

  publish({ lines, storageError, hydrated: true });
}

function persistLines(lines: CartLine[]) {
  let storageError: string | null = null;

  try {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(lines));
  } catch {
    storageError =
      'Your cart is available for this visit, but could not be saved in this browser.';
  }

  publish({ lines, storageError, hydrated: true });
}

function addItem(slug: string, quantity = 1) {
  const item = menuItems.find((menuItem) => menuItem.slug === slug);

  if (!item || !item.isAvailable) {
    throw new Error('This menu item is not available to add to your cart.');
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Cart quantity must be a positive whole number.');
  }

  const existingLine = snapshot.lines.find((line) => line.slug === slug);
  const lines =
    existingLine ?
      snapshot.lines.map((line) =>
        line.slug === slug ?
          { ...line, quantity: line.quantity + quantity }
        : line,
      )
    : [...snapshot.lines, { slug, quantity }];

  persistLines(lines);
}

function setQuantity(slug: string, quantity: number) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Cart quantity must be a positive whole number.');
  }

  persistLines(
    snapshot.lines.map((line) =>
      line.slug === slug ? { ...line, quantity } : line,
    ),
  );
}

function removeItem(slug: string) {
  persistLines(snapshot.lines.filter((line) => line.slug !== slug));
}

function clearCart() {
  persistLines([]);
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    initializeCart();
  }, []);

  const items = useMemo(
    () =>
      cartSnapshot.lines.flatMap((line) => {
        const item = menuItems.find((menuItem) => menuItem.slug === line.slug);

        return item ?
            [{
              ...line,
              item,
              lineTotal: item.price * line.quantity,
            }]
          : [];
      }),
    [cartSnapshot.lines],
  );
  const itemCount = items.reduce((total, line) => total + line.quantity, 0);
  const subtotal = items.reduce((total, line) => total + line.lineTotal, 0);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated: cartSnapshot.hydrated,
      storageError: cartSnapshot.storageError,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [cartSnapshot.hydrated, cartSnapshot.storageError, itemCount, items, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return cart;
}

export function CartStorageNotice() {
  const { storageError } = useCart();

  if (!storageError) {
    return null;
  }

  return (
    <p
      className='mx-auto my-2 max-w-[1200px] px-4 text-sm text-destructive md:px-6'
      role='alert'
    >
      {storageError}
    </p>
  );
}
