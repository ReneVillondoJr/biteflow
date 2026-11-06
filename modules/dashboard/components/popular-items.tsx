import { MoreHorizontal } from 'lucide-react';

import { popularItems } from '../data/dashboard';

export default function PopularItems() {
  return (
    <article className='dashboard-panel dashboard-popular'>
      <div className='dashboard-panel-heading'>
        <div><span>Popular items</span><strong>Top performers</strong></div>
        <button type='button' aria-label='Popular item options'><MoreHorizontal aria-hidden='true' /></button>
      </div>
      <div className='dashboard-popular-list'>
        {popularItems.map((item, index) => (
          <div className='dashboard-popular-item' key={item.name}>
            <span className='dashboard-popular-rank' style={{ backgroundColor: item.color }}>{index + 1}</span>
            <div><strong>{item.name}</strong><small>{item.category}</small></div>
            <div className='dashboard-popular-sales'><strong>{item.orders}</strong><small>orders</small></div>
            <span className='dashboard-popular-value'>{item.value}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
