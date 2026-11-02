import type { Origin as OriginContent } from '../types/about';

type OriginProps = {
  data: OriginContent;
};

export default function Origin({ data }: OriginProps) {
  return (
    <section className='section about-origin'>
      <div className='container story-grid'>
        <div className='story-visual'>
          <div
            className='story-photo'
            role='img'
            aria-label={data.imageAlt}
            style={{ backgroundImage: `url("${data.image}")` }}
          />
          <div className='story-note'>
            <span>BiteFlow</span>
            <strong>{data.note}</strong>
          </div>
        </div>

        <div className='story-copy'>
          <span className='section-label'>
            <span className='section-label__dot' />
            {data.eyebrow}
          </span>

          <h2 className='display-heading'>
            {data.title}
            <br />
            <em>{data.highlight}</em>
          </h2>

          <p>{data.description}</p>
        </div>
      </div>
    </section>
  );
}
