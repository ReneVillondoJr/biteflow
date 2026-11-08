'use client';

import type { LucideIcon } from 'lucide-react';
import { SelectMenu } from '@/components/select';

type OrderSelectProps<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  icon: LucideIcon;
  label: string;
  className?: string;
};

export default function OrderSelect<T extends string>({
  value,
  options,
  onChange,
  icon: Icon,
  label,
  className,
}: OrderSelectProps<T>) {
  return <SelectMenu value={value} options={options} onChange={onChange} icon={Icon} label={label} className={className} />;
}
