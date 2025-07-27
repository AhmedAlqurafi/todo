import { SideBarItem } from '../../app/sidebar/item/item.model';

export const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'mynaGridSolid',
  },
  {
    id: '2',
    title: 'Vital Tasks',
    href: '/vital-tasks',
    icon: 'mynaDangerSolid',
  },
  {
    id: '3',
    title: 'My Tasks',
    href: '/my-tasks',
    icon: 'mynaCalendarCheckSolid',
  },
  {
    id: '4',
    title: 'Task Categories',
    href: '/categories',
    icon: 'mynaListSolid',
  },
  {
    id: '5',
    title: 'Settings',
    href: '/settings',
    icon: 'mynaCogFourSolid',
  },
  {
    id: '6',
    title: 'Help',
    href: '/help',
    icon: 'mynaQuestionCircleSolid',
  },
];
