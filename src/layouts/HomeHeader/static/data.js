import { MdOutlinePerson, MdOutlineLogin } from 'react-icons/md';
import { store } from '../../../redux/store';

const seller = store.getState().auth.seller;
export const userMenuItems = [
  {
    name: 'Dashboard',
    route: '/',
  },
  {
    name: 'Profile',
    icon: MdOutlinePerson,
    route: '/profile',
  },
  seller && seller?.isEmailVerified
    ? {
        name: 'Seller Signup',
        icon: MdOutlineLogin,
        route: '/seller',
      }
    : {
        name: 'Seller Dashbord',
        icon: MdOutlineLogin,
        route: '/seller',
      },
];
