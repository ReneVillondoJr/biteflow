import Link from 'next/link';

export function Brand() {
  return (
    <Link className='brand' href='/' aria-label='BiteFlow homepage'>
      <span className='brand-mark' aria-hidden='true'>
        BF
      </span>

      <span className='brand-copy'>
        <span className='brand-name'>BITEFLOW</span>
        <span className='brand-caption'>KITCHEN &amp; GOODNESS</span>
      </span>
    </Link>
  );
}
