import { CalendarDays, ChevronDown } from 'lucide-react';

import { dashboardSchema } from '../schema';

export default function Heading() {
  return (
    <div className='dashboard-heading'>
      <div>
        <span className='dashboard-kicker'>Thursday, November 6</span>
        <h1>Good morning, Admin</h1>
        <p>Here is what is happening with BiteFlow today.</p>
      </div>

      <button className='dashboard-date-button' type='button'>
        <CalendarDays aria-hidden='true' />
        <span>{dashboardSchema.revenuePeriod}</span>
        <ChevronDown aria-hidden='true' />
      </button>
    </div>
  );
}
