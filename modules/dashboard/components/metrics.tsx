import { ArrowUpRight } from 'lucide-react';

import { metrics } from '../data/dashboard';

export default function Metrics() {
  return (
    <section className='dashboard-metrics' aria-label='Business overview'>
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article className='dashboard-metric-card' key={metric.label}>
            <div className={`dashboard-metric-icon dashboard-metric-icon--${metric.tone}`}>
              <Icon aria-hidden='true' />
            </div>
            <div className='dashboard-metric-copy'>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
            <div className='dashboard-metric-change'>
              <span><ArrowUpRight aria-hidden='true' />{metric.change}</span>
              <small>{metric.detail}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}
