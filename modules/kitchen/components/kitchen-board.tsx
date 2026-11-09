'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
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

  return (
    <Card className='rounded-md border-[#e2e6df] py-0 shadow-none'>
      <div className='flex flex-col gap-3 border-b border-[#e2e6df] px-4 py-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative w-full lg:w-[320px]'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9da59c]' />
          <Input
            value={query}
            onChange={(event) => props.onQueryChange(event.target.value)}
            placeholder='Search order, customer, or item'
            className='h-10 border-[#dde2dc] bg-white pl-9 shadow-none focus-visible:border-[#dde2dc] focus-visible:ring-0'
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
          />
          {(query || station !== 'All stations' || status !== 'All tickets') && (
            <Button variant='ghost' size='sm' className='h-10 rounded-md px-2 text-[10px]' onClick={props.onClearFilters}>
              <X className='size-3.5' />Clear
            </Button>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-3 p-3 xl:grid-cols-3'>
        {kitchenSchema.statuses.map((columnStatus) => {
          const columnTickets = tickets.filter((ticket) => ticket.status === columnStatus);
          return (
            <section key={columnStatus} className='min-w-0 border border-[#edf0ea] bg-[#fafbf8]'>
              <header className='flex h-11 items-center justify-between border-b border-[#edf0ea] bg-white px-3'>
                <strong className='text-[11px] font-black uppercase tracking-[0.08em] text-[#526057]'>{columnStatus}</strong>
                <span className='flex size-6 items-center justify-center rounded-full bg-[#eef1eb] text-[10px] font-black text-[#697568]'>{columnTickets.length}</span>
              </header>
              <div className='grid max-h-[620px] gap-2 overflow-y-auto p-2'>
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
                  <div className='grid min-h-28 place-items-center border border-dashed border-[#dfe4dc] bg-white text-[11px] text-[#9aa29a]'>No tickets</div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </Card>
  );
}
