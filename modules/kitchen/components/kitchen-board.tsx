'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectMenu } from '@/components/select';
import { kitchenSchema } from '../schema';
import KitchenTicket from './kitchen-ticket';
import type { KitchenStatus, KitchenTicket as KitchenTicketType } from '../types/kitchen';

type KitchenBoardProps = {
  tickets: KitchenTicketType[];
  query: string;
  station: (typeof kitchenSchema.stationOptions)[number];
  status: (typeof kitchenSchema.statusFilters)[number];
  onQueryChange: (value: string) => void;
  onStationChange: (value: (typeof kitchenSchema.stationOptions)[number]) => void;
  onStatusChangeFilter: (value: (typeof kitchenSchema.statusFilters)[number]) => void;
  onClearFilters: () => void;
  elapsed: (ticket: KitchenTicketType) => number;
  onStatusChange: (id: string, status: KitchenStatus) => void;
  onToggleHeld: (id: string) => void;
  onTogglePriority: (id: string) => void;
};

export default function KitchenBoard(props: KitchenBoardProps) {
  const { tickets, query, station, status } = props;
  const columnStyles = {
    Queued: {
      marker: 'bg-[#a77b38]',
      count: 'border-[#eadfc9] bg-[#faf6ed] text-[#876733]',
      note: 'Awaiting preparation',
    },
    Preparing: {
      marker: 'bg-[#527b62]',
      count: 'border-[#d7e4d8] bg-[#f0f5ef] text-[#41614c]',
      note: 'In progress',
    },
    Ready: {
      marker: 'bg-[#6483a0]',
      count: 'border-[#d9e2e9] bg-[#f0f4f7] text-[#58738a]',
      note: 'Ready to serve',
    },
    Completed: {
      marker: 'bg-[#879188]',
      count: 'border-[#dfe4dc] bg-[#f4f6f2] text-[#697568]',
      note: 'Handed off',
    },
  };

  return (
    <section>
      <div className='mb-3 flex flex-col gap-3 border border-[#e2e6df] bg-white px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative w-full lg:w-[320px]'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9da59c]' />
          <Input
            value={query}
            onChange={(event) => props.onQueryChange(event.target.value)}
            placeholder='Search order, customer, or item'
            className='h-9 border-[#e1e5de] bg-white pl-9 text-[12px] shadow-none placeholder:text-[#9da59c] focus-visible:border-[#e1e5de] focus-visible:ring-0'
          />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <SelectMenu
            value={station}
            options={kitchenSchema.stationOptions}
            onChange={props.onStationChange}
            icon={SlidersHorizontal}
            label='Filter by kitchen station'
          />
          <SelectMenu
            value={status}
            options={kitchenSchema.statusFilters}
            onChange={props.onStatusChangeFilter}
            label='Filter by ticket status'
            className='h-9'
          />
          {(query || station !== 'All stations' || status !== 'All tickets') && (
            <Button variant='ghost' size='sm' className='h-9 rounded-md px-2 text-[10px] text-[#697568]' onClick={props.onClearFilters}>
              <X className='size-3.5' />Clear
            </Button>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 items-start gap-3 sm:grid-cols-2 2xl:grid-cols-4'>
        {kitchenSchema.statuses.map((columnStatus) => {
          const columnTickets = tickets.filter((ticket) => ticket.status === columnStatus);
          const style = columnStyles[columnStatus];
          return (
            <section key={columnStatus} className='min-w-0 border border-[#e2e6df] bg-[#f8f9f6]'>
              <header className='flex items-center justify-between border-b border-[#e8ece5] bg-white px-3.5 py-3'>
                <div className='flex items-center gap-2.5'>
                  <span className={`h-7 w-1 ${style.marker}`} />
                  <div>
                    <strong className='block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#34443a]'>{columnStatus}</strong>
                    <span className='mt-0.5 block text-[10px] text-[#929a91]'>{style.note}</span>
                  </div>
                </div>
                <span className={`flex h-6 min-w-6 items-center justify-center border px-1.5 text-[10px] font-bold ${style.count}`}>{columnTickets.length}</span>
              </header>
              <div className='grid gap-2.5 p-2.5'>
                {columnTickets.map((ticket) => (
                  <KitchenTicket
                    key={ticket.id}
                    ticket={ticket}
                    elapsedSeconds={props.elapsed(ticket)}
                    onStatusChange={props.onStatusChange}
                    onToggleHeld={props.onToggleHeld}
                    onTogglePriority={props.onTogglePriority}
                  />
                ))}
                {!columnTickets.length && (
                  <div className='grid min-h-28 place-items-center border border-dashed border-[#d9ded6] bg-white text-[11px] text-[#9aa29a]'>No {columnStatus.toLowerCase()} tickets</div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
