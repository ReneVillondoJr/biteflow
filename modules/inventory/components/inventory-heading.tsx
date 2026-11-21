import { PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InventoryHeading({ onAdd }: { onAdd: () => void }) {
  return <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
    <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Stock management</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Inventory</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Track ingredients, stock levels, and replenishment needs.</p></div>
    <Button variant='soft' className='h-10 px-4 font-semibold shadow-sm' onClick={onAdd}><PackagePlus className='size-4' /> Add inventory item</Button>
  </div>;
}
