import { MoreHorizontal } from 'lucide-react';

import { revenuePoints } from '../data/dashboard';
import { dashboardSchema } from '../schema';

export default function Overview() {
  return (
    <section className='dashboard-main-grid'>
      <article className='dashboard-panel dashboard-revenue'>
        <div className='dashboard-panel-heading'>
          <div><span>Revenue overview</span><strong>P 284,620</strong></div>
          <button type='button' aria-label='Revenue options'><MoreHorizontal aria-hidden='true' /></button>
        </div>
        <div className='dashboard-chart' aria-label='Revenue chart for the last seven days'>
          <div className='dashboard-chart-y-axis' aria-hidden='true'>
            <span>P 60k</span><span>P 40k</span><span>P 20k</span><span>P 0</span>
          </div>
          <div className='dashboard-chart-stage'>
            <div className='dashboard-chart-grid' aria-hidden='true'><i /><i /><i /><i /></div>
            <svg viewBox='0 0 700 230' role='img' aria-label='Weekly revenue trend' preserveAspectRatio='none'>
              <defs>
                <linearGradient id='revenueFill' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#254b3a' stopOpacity='.18' />
                  <stop offset='100%' stopColor='#254b3a' stopOpacity='.01' />
                </linearGradient>
              </defs>
              <polygon points='0,174 116,148 233,158 350,106 466,120 583,76 700,88 700,230 0,230' fill='url(#revenueFill)' />
              <polyline points='0,174 116,148 233,158 350,106 466,120 583,76 700,88' fill='none' stroke='#254b3a' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' vectorEffect='non-scaling-stroke' />
              {[0, 116, 233, 350, 466, 583, 700].map((x, index) => (
                <circle key={x} cx={x} cy={[174, 148, 158, 106, 120, 76, 88][index]} r='5' fill='#fffefa' stroke='#254b3a' strokeWidth='3' vectorEffect='non-scaling-stroke' />
              ))}
            </svg>
            <div className='dashboard-chart-labels'>
              {revenuePoints.map((point) => <span key={point.day}>{point.day}</span>)}
            </div>
          </div>
        </div>
      </article>

      <article className='dashboard-panel dashboard-status'>
        <div className='dashboard-panel-heading'>
          <div><span>Orders status</span></div>
          <button type='button' aria-label='Order status options'><MoreHorizontal aria-hidden='true' /></button>
        </div>
        <div className='dashboard-donut-wrap'>
          <div className='dashboard-donut' role='img' aria-label={`1,842 orders: ${dashboardSchema.completionRate} percent completed`}>
            <div><strong>{dashboardSchema.completionRate}%</strong><span>Completed</span></div>
          </div>
        </div>
        <div className='dashboard-status-list'>
          <div><span><i className='status-dot status-dot--green' />Completed</span><strong>{dashboardSchema.statusCounts.completed.toLocaleString('en-US')}</strong></div>
          <div><span><i className='status-dot status-dot--amber' />Preparing</span><strong>{dashboardSchema.statusCounts.preparing}</strong></div>
          <div><span><i className='status-dot status-dot--blue' />On delivery</span><strong>{dashboardSchema.statusCounts.onDelivery}</strong></div>
        </div>
      </article>
    </section>
  );
}
