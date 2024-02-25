import { MdOutlinePerson, MdOutlineLogin } from 'react-icons/md';

export const userMenuItems = [
  {
    name: 'Dashboard',
    route: '/',
  },
  {
    name: 'Profile',
    icon: MdOutlinePerson,
    route: '/',
  },
  {
    name: 'Seller Signup',
    icon: MdOutlineLogin,
    route: '/seller',
  },
];
