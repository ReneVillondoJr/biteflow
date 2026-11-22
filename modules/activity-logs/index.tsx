'use client';

import ActivityLogsHeading from './components/activity-logs-heading';
import ActivityLogsMetrics from './components/activity-logs-metrics';
import ActivityLogsTable from './components/activity-logs-table';
import { useActivityLogs } from './hooks/use-activity-logs';

export default function ActivityLogsModule() {
  const activity = useActivityLogs();
  const successCount = activity.filteredLogs.filter((log) => log.result === 'Success').length;
  const warningCount = activity.filteredLogs.filter((log) => log.result === 'Warning').length;
  const failedCount = activity.filteredLogs.filter((log) => log.result === 'Failed').length;

  return (
    <div className='mx-auto w-full max-w-[1480px] py-3 md:py-4'>
      <ActivityLogsHeading onExport={activity.exportCsv} onRefresh={activity.refreshLogs} />
      <ActivityLogsMetrics total={activity.filteredLogs.length} success={successCount} warnings={warningCount} failed={failedCount} />
      <ActivityLogsTable
        logs={activity.visibleLogs}
        filteredCount={activity.filteredLogs.length}
        query={activity.query}
        category={activity.category}
        result={activity.result}
        page={activity.page}
        pageCount={activity.pageCount}
        onQueryChange={activity.setQuery}
        onCategoryChange={activity.setCategory}
        onResultChange={activity.setResult}
        onPageChange={activity.setPage}
        onClearFilters={activity.clearFilters}
      />
      <p className='mt-3 text-[10px] text-muted-foreground'>Sample activity records for the admin interface. Live audit storage is not connected.</p>
    </div>
  );
}
