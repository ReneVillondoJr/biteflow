import { Sparkles } from 'lucide-react';

export default function ManifestoSection() {
  return (
    <section className='manifesto-section'>
      <div className='container manifesto-inner'>
        <div>
          <span className='manifesto-label'>
            <Sparkles aria-hidden='true' />
            The good food philosophy
          </span>

          <h2 className='manifesto-heading'>
            More flavor.
            <br />
            More feeling.
            <br />
            More good days.
          </h2>
        </div>

        <p className='manifesto-copy'>
          Because food is never just food. It is a pause in a busy day, a reason
          to gather, or a little <em>something good</em> just for you.
        </p>
      </div>
    </section>
  );
}
