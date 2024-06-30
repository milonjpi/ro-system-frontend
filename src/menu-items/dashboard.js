// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  access: ['super_admin', 'admin', 'user'],
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      color: '#2F0F5D',
      breadcrumbs: false,
      access: ['super_admin', 'admin', 'user'],
    },
  ],
};

export default dashboard;
