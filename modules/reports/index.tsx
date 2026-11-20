'use client';

import ReportsManager from './components/reports-manager';
import { useReports } from './hooks/use-reports';

export default function ReportsModule() {
  const reports = useReports();
  return <ReportsManager reports={reports} />;
}
