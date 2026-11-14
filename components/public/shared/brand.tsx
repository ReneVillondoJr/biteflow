import Link from 'next/link';

export function Brand() {
  return (
    <Link className='group flex items-center gap-3' href='/' aria-label='BiteFlow homepage'>
      <span className='flex size-10 items-center justify-center rounded-[14px_14px_14px_5px] bg-primary text-xs font-black tracking-wide text-primary-foreground shadow-sm transition-transform group-hover:-translate-y-0.5' aria-hidden='true'>
        BF
      </span>

      <span className='grid leading-none'>
        <span className='text-sm font-extrabold tracking-[0.13em] text-foreground'>BITEFLOW</span>
        <span className='mt-1 text-[8px] font-bold tracking-[0.18em] text-muted-foreground'>KITCHEN &amp; GOODNESS</span>
      </span>
    </Link>
  );
}
