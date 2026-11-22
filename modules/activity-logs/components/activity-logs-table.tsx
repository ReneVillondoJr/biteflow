'use client';

import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { activityLogSchema } from '../schema';
import type { ActivityLog } from '../types/activity-log';

type Props = {
  logs: ActivityLog[]; filteredCount: number; query: string;
  category: (typeof activityLogSchema.categoryOptions)[number];
  result: (typeof activityLogSchema.resultOptions)[number];
  page: number; pageCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: (typeof activityLogSchema.categoryOptions)[number]) => void;
  onResultChange: (value: (typeof activityLogSchema.resultOptions)[number]) => void;
  onPageChange: (page: number) => void; onClearFilters: () => void;
};

const resultStyle = {
  Success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Warning: 'border-amber-200 bg-amber-50 text-amber-700',
  Failed: 'border-red-200 bg-red-50 text-red-700',
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function ActivityLogsTable({ logs, filteredCount, query, category, result, page, pageCount, onQueryChange, onCategoryChange, onResultChange, onPageChange, onClearFilters }: Props) {
  const hasFilters = query || category !== 'All categories' || result !== 'All results';
  return (
    <Card className='overflow-hidden rounded-md border-border shadow-sm'>
      <div className='flex flex-col gap-3 border-b border-border px-4 py-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative w-full lg:w-[320px]'><Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' aria-hidden='true' /><Input aria-label='Search activity logs' className='h-9 border-[#dde2dc] bg-white pl-9 shadow-none' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder='Search actor, action, target, IP' /></div>
        <div className='flex flex-wrap items-center gap-2'>
          <select aria-label='Filter activity by category' className='h-9 rounded-md border border-[#dde2dc] bg-white px-3 text-xs' value={category} onChange={(event) => onCategoryChange(event.target.value as typeof category)}>{activityLogSchema.categoryOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <select aria-label='Filter activity by result' className='h-9 rounded-md border border-[#dde2dc] bg-white px-3 text-xs' value={result} onChange={(event) => onResultChange(event.target.value as typeof result)}>{activityLogSchema.resultOptions.map((option) => <option key={option}>{option}</option>)}</select>
          {hasFilters ? <Button variant='ghost' size='sm' className='h-9 rounded-md px-2 text-[10px]' onClick={onClearFilters}><X className='size-3.5' aria-hidden='true' />Clear</Button> : null}
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table className='min-w-[940px]'>
          <TableHeader><TableRow>
            <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Event</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Actor</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Action</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Category</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Result</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Date &amp; time</TableHead>
            <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>IP address</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {logs.map((log) => <TableRow key={log.id}>
              <TableCell className='h-[66px] px-4'><strong className='text-[11px] text-[#25382d]'>{log.id}</strong><span className='mt-1 block text-[10px] text-muted-foreground'>{log.target}</span></TableCell>
              <TableCell className='px-4'><strong className='block text-[12px] font-semibold'>{log.actor}</strong><span className='text-[10px] text-muted-foreground'>{log.role}</span></TableCell>
              <TableCell className='px-4 text-[12px] font-medium'>{log.action}</TableCell>
              <TableCell className='px-4 text-[11px] text-muted-foreground'>{log.category}</TableCell>
              <TableCell className='px-4'><Badge className={`rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${resultStyle[log.result]}`}>{log.result}</Badge></TableCell>
              <TableCell className='px-4 text-[11px] text-muted-foreground'>{formatDate(log.occurredAt)}</TableCell>
              <TableCell className='px-4 font-mono text-[10px] text-muted-foreground'>{log.ipAddress}</TableCell>
            </TableRow>)}
            {!logs.length ? <TableRow><TableCell colSpan={7} className='h-40 text-center text-sm text-muted-foreground'>No activity matches the current filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
      <div className='flex h-12 items-center justify-between border-t border-border px-4'><span className='text-[11px] text-muted-foreground'>Showing {logs.length} of {filteredCount} events</span><div className='flex items-center gap-1'><Button variant='outline' size='icon-sm' disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label='Previous page'><ChevronLeft /></Button><span className='min-w-16 text-center text-[11px] font-semibold'>{page} / {pageCount}</span><Button variant='outline' size='icon-sm' disabled={page === pageCount} onClick={() => onPageChange(page + 1)} aria-label='Next page'><ChevronRight /></Button></div></div>
    </Card>
  );
}
