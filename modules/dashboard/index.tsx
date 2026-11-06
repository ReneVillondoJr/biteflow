import Heading from './components/heading';
import Metrics from './components/metrics';
import Overview from './components/overview';
import Operations from './components/operations';
import RecentOrders from './components/recent-orders';
import PopularItems from './components/popular-items';

export default function DashboardModule() {
  return (
    <div className='admin-dashboard'>
      <Heading />
      <Metrics />
      <Overview />

      <section className='dashboard-bottom-grid'>
        <RecentOrders />
        <PopularItems />
      </section>

      <Operations />
    </div>
  );
}
