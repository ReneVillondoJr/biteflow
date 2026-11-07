'use client';

import { useState } from 'react';

export function useDateRange(options: readonly string[]) {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return {
    selected,
    open,
    toggle: () => setOpen((value) => !value),
    select: (option: string) => {
      setSelected(option);
      setOpen(false);
    },
  };
}
