import { ArrowUpRight, Clock3 } from 'lucide-react';

import { orders } from '../data/dashboard';

export default function RecentOrders() {
  return (
    <article className='dashboard-panel dashboard-orders'>
      <div className='dashboard-panel-heading'>
        <div><span>Recent orders</span><strong>Live activity</strong></div>
        <a href='/admin/orders'>View all <ArrowUpRight aria-hidden='true' /></a>
      </div>
      <div className='dashboard-table-wrap'>
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Time</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong><small>{order.items}</small></td>
                <td>{order.customer}</td>
                <td><strong>{order.total}</strong></td>
                <td><span className={`order-status order-status--${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></td>
                <td><span className='dashboard-time'><Clock3 aria-hidden='true' />{order.time}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
