'use client';

import { useMemo, useState } from 'react';
import { initialActivityLogs } from '../data/activity-logs';
import { activityLogSchema } from '../schema';
import type { ActivityLog } from '../types/activity-log';

export function useActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof activityLogSchema.categoryOptions)[number]>('All categories');
  const [result, setResult] = useState<(typeof activityLogSchema.resultOptions)[number]>('All results');
  const [page, setPage] = useState(1);

  const filteredLogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return logs.filter((log) => {
      const searchable = [log.id, log.actor, log.role, log.action, log.target, log.category, log.ipAddress].join(' ').toLowerCase();
      return (!normalized || searchable.includes(normalized))
        && (category === 'All categories' || log.category === category)
        && (result === 'All results' || log.result === result);
    });
  }, [logs, query, category, result]);

  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / activityLogSchema.pageSize));
  const visibleLogs = filteredLogs.slice((page - 1) * activityLogSchema.pageSize, page * activityLogSchema.pageSize);
  function setQueryValue(value: string) { setQuery(value); setPage(1); }
  function setCategoryValue(value: (typeof activityLogSchema.categoryOptions)[number]) { setCategory(value); setPage(1); }
  function setResultValue(value: (typeof activityLogSchema.resultOptions)[number]) { setResult(value); setPage(1); }
  function clearFilters() { setQuery(''); setCategory('All categories'); setResult('All results'); setPage(1); }
  function refreshLogs() { setLogs(initialActivityLogs.map((log) => ({ ...log }))); setPage(1); }

  function exportCsv() {
    const header = ['ID', 'Actor', 'Role', 'Action', 'Target', 'Category', 'Result', 'Occurred at', 'IP address'];
    const rows = filteredLogs.map((log) => [log.id, log.actor, log.role, log.action, log.target, log.category, log.result, log.occurredAt, log.ipAddress]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'biteflow-activity-logs.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return { filteredLogs, visibleLogs, query, category, result, page, pageCount, setQuery: setQueryValue, setCategory: setCategoryValue, setResult: setResultValue, setPage, clearFilters, refreshLogs, exportCsv };
}
