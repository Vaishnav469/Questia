import Image from "next/image";

import { SideNavItem } from './types';

export const TEACHER_SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Forms',
    path: '/dashboard/teacher/forms-list',
    icon: <Image alt="" src="/quiz.png" width="45" height="45" />,
  },
  {
    title: 'Classrooms',
    path: '/dashboard/teacher/rooms-list',
    icon: <Image alt="" src="/classroom.png" width="45" height="45" />,
  },
];
