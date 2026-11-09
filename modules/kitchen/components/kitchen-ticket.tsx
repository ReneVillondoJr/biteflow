'use client';

import { AlarmClock, ChefHat, Check, Flame, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { KitchenStatus, KitchenTicket as KitchenTicketType } from '../types/kitchen';

type KitchenTicketProps = {
  ticket: KitchenTicketType;
  elapsedSeconds: number;
  onStatusChange: (id: string, status: KitchenStatus) => void;
  onToggleHeld: (id: string) => void;
  onTogglePriority: (id: string) => void;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function KitchenTicket({ ticket, elapsedSeconds, onStatusChange, onToggleHeld, onTogglePriority }: KitchenTicketProps) {
  const overdue = elapsedSeconds >= 900 && ticket.status !== 'Ready';

  return (
    <article className={`border bg-white ${ticket.priority === 'Priority' ? 'border-[#d9ad66]' : 'border-[#e2e6df]'} ${ticket.held ? 'opacity-75' : ''}`}>
      <div className='flex items-center justify-between border-b border-[#edf0ea] px-3 py-2.5'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <strong className='text-[13px] text-[#26382e]'>{ticket.orderNumber}</strong>
            {ticket.priority === 'Priority' && <span className='flex items-center gap-1 text-[9px] font-black uppercase text-[#9a6840]'><Flame className='size-3' />Priority</span>}
          </div>
          <span className='mt-0.5 block truncate text-[10px] text-[#879087]'>{ticket.customer} · {ticket.type}</span>
        </div>
        <Button size='icon-sm' variant='ghost' className='size-7 rounded-md' aria-label={ticket.priority === 'Priority' ? 'Remove priority' : 'Mark priority'} onClick={() => onTogglePriority(ticket.id)}>
          <Flame className={`size-3.5 ${ticket.priority === 'Priority' ? 'text-[#b87943]' : 'text-[#aeb5ad]'}`} />
        </Button>
      </div>

      <div className='px-3 py-3'>
        <div className='mb-3 flex items-center justify-between'>
          <span className='text-[9px] font-black uppercase tracking-wide text-[#879087]'>{ticket.station}</span>
          <span className={`flex items-center gap-1 text-[11px] font-bold ${overdue ? 'text-[#b34c43]' : 'text-[#68736a]'}`}><AlarmClock className='size-3.5' />{formatTime(elapsedSeconds)}</span>
        </div>
        <div className='grid gap-2'>
          {ticket.items.map((item) => (
            <div className='grid grid-cols-[22px_1fr] gap-1.5 text-[12px]' key={item.name}>
              <strong className='text-[#526057]'>{item.quantity}×</strong>
              <div>
                <span className='font-semibold text-[#26382e]'>{item.name}</span>
                {item.note && <small className='mt-0.5 block text-[10px] text-[#9a6840]'>{item.note}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-[40px_1fr] gap-2 border-t border-[#edf0ea] p-2'>
        <Button size='icon-sm' variant='outline' className='rounded-md' aria-label={ticket.held ? 'Release held ticket' : 'Hold ticket'} onClick={() => onToggleHeld(ticket.id)}>
          {ticket.held ? <Play className='size-3.5' /> : <Pause className='size-3.5' />}
        </Button>
        {ticket.status === 'Queued' && (
          <Button size='sm' className='rounded-md bg-[#26382e] px-3 text-[11px] text-white hover:bg-[#34503f]' disabled={ticket.held} onClick={() => onStatusChange(ticket.id, 'Preparing')}>
            <ChefHat className='size-3.5' />Start preparation
          </Button>
        )}
        {ticket.status === 'Preparing' && (
          <Button size='sm' className='rounded-md bg-[#26382e] px-3 text-[11px] text-white hover:bg-[#34503f]' disabled={ticket.held} onClick={() => onStatusChange(ticket.id, 'Ready')}>
            <Check className='size-3.5' />Mark ready
          </Button>
        )}
        {ticket.status === 'Ready' && (
          <Button size='sm' variant='outline' className='rounded-md px-3 text-[11px]' onClick={() => onStatusChange(ticket.id, 'Preparing')}>
            <RotateCcw className='size-3.5' />Recall ticket
          </Button>
        )}
      </div>
    </article>
  );
}
