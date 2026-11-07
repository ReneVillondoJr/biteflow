import Heading from './components/heading';
import Metrics from './components/metrics';
import Overview from './components/overview';
import Operations from './components/operations';
import RecentOrders from './components/recent-orders';
import PopularItems from './components/popular-items';

export default function DashboardModule() {
  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <Heading />
      <Metrics />
      <Overview />

      <section className='mb-4 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)]'>
        <RecentOrders />
        <PopularItems />
      </section>

      <Operations />
    </div>
  );
}
