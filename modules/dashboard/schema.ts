export const dashboardSchema = {
  revenuePeriod: 'Nov 1 - Nov 6, 2026',
  revenuePeriods: [
    'Nov 1 - Nov 6, 2026',
    'Oct 26 - Nov 1, 2026',
    'October 2026',
    'September 2026',
  ],
  completionRate: 68,
  statusCounts: {
    completed: 1252,
    preparing: 368,
    onDelivery: 222,
  },
} as const;