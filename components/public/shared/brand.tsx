import Link from 'next/link';

export function Brand() {
  return (
    <Link className='flex items-center gap-2.5' href='/' aria-label='BiteFlow homepage'>
      <span className='flex size-10 items-center justify-center rounded-full bg-primary text-xs font-black tracking-wide text-primary-foreground' aria-hidden='true'>
        BF
      </span>

      <span className='grid leading-none'>
        <span className='text-sm font-black tracking-[0.12em] text-primary'>BITEFLOW</span>
        <span className='mt-1 text-[8px] font-bold tracking-[0.18em] text-muted-foreground'>KITCHEN &amp; GOODNESS</span>
      </span>
    </Link>
  );
}
