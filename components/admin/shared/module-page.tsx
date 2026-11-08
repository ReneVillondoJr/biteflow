import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ModulePageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  primaryAction?: {
    label: string;
    href: string;
  };
};

export default function AdminModulePage({
  title,
  description,
  icon: Icon,
  primaryAction,
}: ModulePageProps) {
  return (
    <div className='grid min-h-[520px] place-items-center'>
      <Card className='w-full max-w-lg rounded-md border-border bg-card p-8 text-center shadow-[0_18px_50px_rgba(32,46,37,.05)]'>
        <span className='mx-auto flex size-14 items-center justify-center rounded-[18px_18px_18px_6px] bg-primary/10 text-primary'>
          <Icon className='size-6' aria-hidden='true' />
        </span>
        <span className='mt-5 block text-[9px] font-black uppercase tracking-[0.16em] text-primary'>Admin workspace</span>
        <h1 className='mt-1 font-heading text-3xl font-normal tracking-tight'>{title}</h1>
        <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground'>{description}</p>
        {primaryAction && (
          <Button className='mt-6 rounded-md' render={<Link href={primaryAction.href} />}>
            {primaryAction.label}
            <ArrowRight className='size-4' aria-hidden='true' />
          </Button>
        )}
      </Card>
    </div>
  );
}
