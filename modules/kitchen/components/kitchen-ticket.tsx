'use client';

import { AlarmClock, ChefHat, Check, CircleCheck, Flame, Pause, Play, RotateCcw } from 'lucide-react';
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

function formatCompletionTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Manila',
  }).format(new Date(value));
}

export default function KitchenTicket({ ticket, elapsedSeconds, onStatusChange, onToggleHeld, onTogglePriority }: KitchenTicketProps) {
  const overdue = elapsedSeconds >= 900 && ticket.status !== 'Ready' && ticket.status !== 'Completed';

  return (
    <article className={`border border-l-2 bg-white ${ticket.priority === 'Priority' ? 'border-y-[#e2d4b8] border-r-[#e2d4b8] border-l-[#b78749]' : 'border-[#e4e8e1] border-l-[#cbd4c8]'} ${ticket.held ? 'opacity-70' : ''}`}>
      <div className='flex items-center justify-between gap-2 border-b border-[#edf0ea] px-3 py-2.5'>
        <div className='min-w-0'>
          <div className='flex items-center gap-2'>
            <strong className='text-[13px] font-bold tracking-[-0.01em] text-[#26382e]'>{ticket.orderNumber}</strong>
            {ticket.priority === 'Priority' && <span className='flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-wide text-[#9a6840]'><Flame className='size-3' />Priority</span>}
          </div>
          <span className='mt-1 block truncate text-[10px] text-[#879087]'>{ticket.customer}<span className='px-1 text-[#c2c8c0]'>/</span>{ticket.type}</span>
        </div>
        <Button size='icon-sm' variant='ghost' className='size-7 shrink-0 rounded-md text-[#89938a] hover:text-[#9a6840]' aria-label={ticket.priority === 'Priority' ? 'Remove priority' : 'Mark priority'} onClick={() => onTogglePriority(ticket.id)}>
          <Flame className={`size-3.5 ${ticket.priority === 'Priority' ? 'text-[#b87943]' : 'text-[#aeb5ad]'}`} />
        </Button>
      </div>

      <div className='px-3 py-2.5'>
        <div className='mb-2.5 flex items-center justify-between'>
          <span className='border border-[#edf0ea] bg-[#f8f9f6] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#768176]'>{ticket.station}</span>
          <span className={`flex items-center gap-1 text-[10px] font-bold tabular-nums ${overdue ? 'text-[#b34c43]' : 'text-[#68736a]'}`}><AlarmClock className='size-3' />{formatTime(elapsedSeconds)}{overdue && <span className='ml-0.5 text-[8px] font-extrabold uppercase'>Late</span>}</span>
        </div>
        {ticket.status === 'Completed' && ticket.completedAt && (
          <div className='mb-2.5 border-l-2 border-[#cbd4c8] pl-2'>
            <span className='block text-[8px] font-bold uppercase tracking-[0.08em] text-[#929a91]'>Completed at</span>
            <time className='mt-0.5 block text-[10px] font-semibold tabular-nums text-[#526057]' dateTime={ticket.completedAt}>
              {formatCompletionTime(ticket.completedAt)}
            </time>
          </div>
        )}
        <div className='grid gap-2'>
          {ticket.items.map((item) => (
            <div className='grid grid-cols-[20px_1fr] gap-1.5 text-[11px]' key={item.name}>
              <strong className='text-[#667268]'>{item.quantity}×</strong>
              <div>
                <span className='font-medium leading-snug text-[#34443a]'>{item.name}</span>
                {item.note && <small className='mt-1 block border-l border-[#d8bd8b] pl-1.5 text-[9px] leading-snug text-[#9a6840]'>{item.note}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-[34px_1fr] gap-2 border-t border-[#edf0ea] p-2'>
        {ticket.status !== 'Completed' ? (
          <Button size='icon-sm' variant='outline' className='size-8 rounded-md border-[#e3e7e0] text-[#758075] shadow-none' aria-label={ticket.held ? 'Release held ticket' : 'Hold ticket'} onClick={() => onToggleHeld(ticket.id)}>
            {ticket.held ? <Play className='size-3.5' /> : <Pause className='size-3.5' />}
          </Button>
        ) : <span aria-hidden='true' />}
        {ticket.status === 'Queued' && (
          <Button size='sm' variant='outline' className='h-8 rounded-md border-[#e1e5de] bg-white px-3 text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4] hover:text-[#34443a]' disabled={ticket.held} onClick={() => onStatusChange(ticket.id, 'Preparing')}>
            <ChefHat className='size-3.5 text-[#788579]' />Start preparation
          </Button>
        )}
        {ticket.status === 'Preparing' && (
          <Button size='sm' variant='outline' className='h-8 rounded-md border-[#e1e5de] bg-white px-3 text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4] hover:text-[#34443a]' disabled={ticket.held} onClick={() => onStatusChange(ticket.id, 'Ready')}>
            <Check className='size-3.5 text-[#788579]' />Mark ready
          </Button>
        )}
        {ticket.status === 'Ready' && (
          <Button size='sm' variant='outline' className='h-8 rounded-md border-[#e1e5de] bg-white px-3 text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4] hover:text-[#34443a]' onClick={() => onStatusChange(ticket.id, 'Completed')}>
            <CircleCheck className='size-3.5 text-[#788579]' />Mark complete
          </Button>
        )}
        {ticket.status === 'Completed' && (
          <Button size='sm' variant='outline' className='h-8 rounded-md border-[#e1e5de] bg-white px-3 text-[10px] font-semibold text-[#526057] shadow-none hover:bg-[#f6f8f4] hover:text-[#34443a]' onClick={() => onStatusChange(ticket.id, 'Ready')}>
            <RotateCcw className='size-3.5 text-[#788579]' />Reopen as ready
          </Button>
        )}
      </div>
    </article>
  );
}
