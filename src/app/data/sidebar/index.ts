import { SideBarItem } from '../../layout/dashboard-layout/sidebar/item/item.model';

export const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    id: '1',
    title: 'Homepage',
    href: '/dashboard',
    icon: 'mynaGridSolid',
  },
  // {
  //   id: '2',
  //   title: 'Vital Tasks',
  //   href: '/dashboard/vital-tasks',
  //   icon: 'mynaDangerSolid',
  // },
  // {
  //   id: '3',
  //   title: 'My Tasks',
  //   href: '/dashboard/my-tasks',
  //   icon: 'mynaCalendarCheckSolid',
  // },
  {
    id: '4',
    title: 'Task Categories',
    href: '/dashboard/categories',
    icon: 'mynaListSolid',
  },
  {
    id: '5',
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'mynaCogFourSolid',
  },
  {
    id: '6',
    title: 'Help',
    href: '/dashboard/help',
    icon: 'mynaQuestionCircleSolid',
  },
];
