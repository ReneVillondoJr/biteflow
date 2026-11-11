import { CheckCheck, ChefHat, ClipboardCheck, PackageCheck, Truck } from 'lucide-react';

type DeliveryMetricsProps = {
  metrics: { queued: number; preparing: number; ready: number; onDelivery: number; completed: number };
};

export default function DeliveryMetrics({ metrics }: DeliveryMetricsProps) {
  const items = [
    { label: 'Queued', value: metrics.queued, icon: ClipboardCheck, tone: 'text-[#667b6b] bg-[#f3f6f1]' },
    { label: 'Preparing', value: metrics.preparing, icon: ChefHat, tone: 'text-[#97722f] bg-[#faf5e7]' },
    { label: 'Ready', value: metrics.ready, icon: PackageCheck, tone: 'text-[#58738a] bg-[#f0f4f7]' },
    { label: 'On delivery', value: metrics.onDelivery, icon: Truck, tone: 'text-[#58738a] bg-[#f0f4f7]' },
    { label: 'Completed', value: metrics.completed, icon: CheckCheck, tone: 'text-[#667b6b] bg-[#f3f6f1]' },
  ];

  return (
    <div className='mb-5 grid grid-cols-2 divide-x divide-y divide-[#e9ede6] border border-[#e2e6df] bg-white sm:grid-cols-3 sm:divide-y-0 2xl:grid-cols-5'>
      {items.map((item) => (
        <div key={item.label} className='flex min-h-[66px] items-center gap-3 px-3 sm:px-4'>
          <span className={`flex size-8 shrink-0 items-center justify-center rounded-md ${item.tone}`}><item.icon className='size-3.5' /></span>
          <div>
            <strong className='block text-lg font-bold leading-none text-[#26382e]'>{item.value}</strong>
            <span className='mt-1 block text-[9px] font-bold uppercase tracking-[0.09em] text-[#879087]'>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
