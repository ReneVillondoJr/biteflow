import { AlarmClock, ChefHat, ClipboardCheck, Flame, PauseCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

type KitchenMetricsProps = {
  metrics: { queued: number; preparing: number; ready: number; priority: number; held: number };
};

export default function KitchenMetrics({ metrics }: KitchenMetricsProps) {
  const items = [
    { label: 'Queued', value: metrics.queued, icon: ClipboardCheck, tone: 'text-[#667b6b] bg-[#f3f6f1]' },
    { label: 'Preparing', value: metrics.preparing, icon: ChefHat, tone: 'text-[#97722f] bg-[#faf5e7]' },
    { label: 'Ready', value: metrics.ready, icon: AlarmClock, tone: 'text-[#3c7258] bg-[#edf5ef]' },
    { label: 'Priority', value: metrics.priority, icon: Flame, tone: 'text-[#a45345] bg-[#f8efec]' },
    { label: 'Held', value: metrics.held, icon: PauseCircle, tone: 'text-[#667087] bg-[#f0f2f5]' },
  ];

  return (
    <div className='mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5'>
      {items.map((item) => (
        <Card key={item.label} className='rounded-md border-[#e2e6df] py-0 shadow-none'>
          <div className='flex min-h-[76px] items-center gap-3 px-4'>
            <span className={`flex size-9 items-center justify-center rounded-md ${item.tone}`}><item.icon className='size-4' /></span>
            <div><strong className='block text-xl font-bold text-[#26382e]'>{item.value}</strong><span className='text-[10px] font-bold uppercase tracking-wide text-[#879087]'>{item.label}</span></div>
          </div>
        </Card>
      ))}
    </div>
  );
}
