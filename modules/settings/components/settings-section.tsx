import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function SettingsSection({ icon: Icon, title, description, children }: { icon: LucideIcon; title: string; description: string; children: ReactNode }) {
  return <Card className='rounded-md border-border bg-card p-5 shadow-sm sm:p-6'>
    <div className='mb-5 flex items-start gap-3'><span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'><Icon className='size-4' /></span><div><h2 className='text-base font-semibold'>{title}</h2><p className='mt-0.5 text-xs text-muted-foreground'>{description}</p></div></div>
    {children}
  </Card>;
}
