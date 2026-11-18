import type { StaffData } from '../schema';

export const staffData: StaffData = {
  staff: [
    { id: 'staff-ana-reyes', name: 'Ana Reyes', email: 'ana.reyes@biteflow.example', phone: '+63 917 220 1840', role: 'manager', shift: 'morning', location: 'Makati Central', status: 'active', hiredAt: '2022-04-18', permissions: ['orders', 'menu', 'inventory', 'reports', 'staff'], notes: 'Store opening lead.' },
    { id: 'staff-miguel-torres', name: 'Miguel Torres', email: 'miguel.torres@biteflow.example', phone: '+63 918 431 6720', role: 'supervisor', shift: 'afternoon', location: 'Makati Central', status: 'active', hiredAt: '2023-08-07', permissions: ['orders', 'inventory', 'reports'], notes: '' },
    { id: 'staff-julia-mendoza', name: 'Julia Mendoza', email: 'julia.mendoza@biteflow.example', phone: '+63 922 115 9032', role: 'cashier', shift: 'morning', location: 'BGC', status: 'active', hiredAt: '2024-01-15', permissions: ['orders'], notes: 'Cross-trained on pickup handoff.' },
    { id: 'staff-paolo-santos', name: 'Paolo Santos', email: 'paolo.santos@biteflow.example', phone: '+63 919 882 4510', role: 'cook', shift: 'evening', location: 'BGC', status: 'active', hiredAt: '2023-11-20', permissions: ['orders', 'inventory'], notes: '' },
    { id: 'staff-camille-cruz', name: 'Camille Cruz', email: 'camille.cruz@biteflow.example', phone: '+63 927 362 7741', role: 'server', shift: 'afternoon', location: 'Quezon City', status: 'on-leave', hiredAt: '2025-03-03', permissions: ['orders'], notes: 'Scheduled leave through the end of the month.' },
    { id: 'staff-ramon-garcia', name: 'Ramon Garcia', email: 'ramon.garcia@biteflow.example', phone: '+63 915 609 3800', role: 'delivery', shift: 'flexible', location: 'Quezon City', status: 'active', hiredAt: '2024-09-09', permissions: ['orders'], notes: '' },
  ],
};
