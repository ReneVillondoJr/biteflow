'use client';

import { AlarmClock, Check, ChefHat, MapPin, PackageCheck, RotateCcw, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectMenu } from '@/components/select';
import { deliverySchema } from '../schema';
import type { DeliveryStatus, DeliveryTicket as DeliveryTicketType } from '../types/delivery';

type DeliveryTicketProps = {
  ticket: DeliveryTicketType;
  elapsedSeconds: number;
  onStatusChange: (id: string, status: DeliveryStatus) => void;
  onAssignRider: (id: string, rider: string) => void;
};

function formatElapsed(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function formatCompletionTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(new Date(value));
}

export default function DeliveryTicket({ ticket, elapsedSeconds, onStatusChange, onAssignRider }: DeliveryTicketProps) {
  const overdue = elapsedSeconds >= 1800 && ticket.status !== 'Completed';
  const riderOptions = deliverySchema.riderOptions.filter((option) => option !== 'All riders');
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ticket.address)}`;

  return (
    <article className={`border border-l-2 bg-white ${ticket.status === 'On delivery' ? 'border-y-[#d7e1e9] border-r-[#d7e1e9] border-l-[#6483a0]' : ticket.status === 'Completed' ? 'border-y-[#dfe4dc] border-r-[#dfe4dc] border-l-[#91a08f]' : 'border-y-[#e4e8e1] border-r-[#e4e8e1] border-l-[#cbd4c8]'}`}>
      <header className='flex items-center justify-between gap-2 border-b border-[#edf0ea] px-3 py-2.5'>
        <div className='min-w-0'>
          <strong className='text-[13px] font-bold tracking-[-0.01em] text-[#26382e]'>{ticket.id}</strong>
          <span className='mt-1 block truncate text-[10px] text-[#879087]'>{ticket.customer}<span className='px-1 text-[#c2c8c0]'>/</span>{ticket.placedAt}</span>
        </div>
        <span className={`flex shrink-0 items-center gap-1 text-[10px] font-bold tabular-nums ${overdue ? 'text-[#b34c43]' : 'text-[#68736a]'}`}>
          <AlarmClock className='size-3' />{formatElapsed(elapsedSeconds)}{overdue && <span className='text-[8px] uppercase'>Late</span>}
        </span>
      </header>

      <div className='grid gap-3 px-3 py-3'>
        <div className='flex items-start gap-2'>
          <MapPin className='mt-0.5 size-3.5 shrink-0 text-[#849087]' />
          <a href={mapUrl} target='_blank' rel='noreferrer' className='text-[10px] leading-snug text-[#526057] underline decoration-[#d9ded6] underline-offset-2 hover:text-[#26382e]'>
            {ticket.address}
          </a>
        </div>

        <div className='grid gap-1.5 border-y border-[#f0f2ee] py-2'>
          {ticket.items.map((item) => (
            <div className='grid grid-cols-[20px_1fr] gap-1.5 text-[11px]' key={item.name}>
              <strong className='text-[#667268]'>{item.quantity}×</strong>
              <span className='font-medium leading-snug text-[#34443a]'>{item.name}</span>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-between gap-2'>
          {ticket.status === 'Completed' ? (
            <div>
              <span className='block text-[8px] font-bold uppercase tracking-[0.08em] text-[#929a91]'>Completed at</span>
              <time className='mt-0.5 block text-[10px] font-semibold tabular-nums text-[#526057]' dateTime={ticket.completedAt ?? undefined}>
                {ticket.completedAt ? formatCompletionTime(ticket.completedAt) : 'Completion time unavailable'}
              </time>
            </div>
          ) : (
            <div className='min-w-0 flex-1'>
              <span className='mb-1 block text-[8px] font-bold uppercase tracking-[0.08em] text-[#929a91]'>Assigned rider</span>
              <SelectMenu
                value={ticket.rider}
                options={riderOptions}
                onChange={(value) => onAssignRider(ticket.id, value)}
                label={`Assign rider for ${ticket.id}`}
                className='h-8 w-full min-w-0 px-2 text-[10px]'
              />
            </div>
          )}
          <div className='shrink-0 text-right'>
            <span className='block text-[8px] font-bold uppercase tracking-[0.08em] text-[#929a91]'>Total · {ticket.payment}</span>
            <strong className='mt-0.5 block text-[12px] text-[#34443a]'>{ticket.total}</strong>
          </div>
        </div>

        {ticket.status !== 'Completed' && (
          <a href={`tel:${ticket.phone.replaceAll(' ', '')}`} className='w-fit text-[10px] font-semibold text-[#748174] underline decoration-[#d9ded6] underline-offset-2 hover:text-[#26382e]'>
            Call {ticket.customer}
          </a>
        )}
      </div>

      <footer className='border-t border-[#edf0ea] p-2'>
        {ticket.status === 'Queued' && (
          <Button size='sm' variant='outline' className='h-8 w-full rounded-md border-[#e1e5de] bg-white text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4]' onClick={() => onStatusChange(ticket.id, 'Preparing')}>
            <ChefHat className='size-3.5 text-[#788579]' />Start preparation
          </Button>
        )}
        {ticket.status === 'Preparing' && (
          <Button size='sm' variant='outline' className='h-8 w-full rounded-md border-[#e1e5de] bg-white text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4]' onClick={() => onStatusChange(ticket.id, 'Ready')}>
            <Check className='size-3.5 text-[#788579]' />Mark ready
          </Button>
        )}
        {ticket.status === 'Ready' && (
          <Button size='sm' variant='outline' className='h-8 w-full rounded-md border-[#e1e5de] bg-white text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4]' disabled={ticket.rider === 'Unassigned'} onClick={() => onStatusChange(ticket.id, 'On delivery')}>
            <Truck className='size-3.5 text-[#788579]' />Dispatch rider
          </Button>
        )}
        {ticket.status === 'On delivery' && (
          <Button size='sm' variant='outline' className='h-8 w-full rounded-md border-[#e1e5de] bg-white text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4]' onClick={() => onStatusChange(ticket.id, 'Completed')}>
            <PackageCheck className='size-3.5 text-[#788579]' />Confirm delivery
          </Button>
        )}
        {ticket.status === 'Completed' && (
          <Button size='sm' variant='outline' className='h-8 w-full rounded-md border-[#e1e5de] bg-white text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4]' onClick={() => onStatusChange(ticket.id, 'On delivery')}>
            <RotateCcw className='size-3.5 text-[#788579]' />Reopen delivery
          </Button>
        )}
      </footer>
    </article>
  );
}
