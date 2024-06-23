import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';
import { LuCircuitBoard, LuUser } from 'react-icons/lu';
// Admin Imports
import MainDashboard from './views/admin/default';
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import DataTables from './views/admin/dataTables';
import RTL from './views/admin/rtl';

// Auth Imports
import SignInCentered from './views/auth/signIn';
import Register from './views/auth/register';

export const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Register',
    layout: '/auth',
    path: '/register',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <Register />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];

export const sellerRoutes = [
  {
    name: 'Main Dashboard',
    layout: '/seller',
    path: '',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Models',
    layout: '/seller',
    path: '/models',
    icon: <Icon as={LuCircuitBoard} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Customers',
    layout: '/seller',
    path: '/customers',
    icon: <Icon as={LuUser} width="20px" height="20px" color="inherit" />,
  },
];

export const userRoutes = [
  {
    name: 'Purchased Models',
    layout: '/user',
    path: '/purchased-models',
    icon: <Icon as={LuCircuitBoard} width="20px" height="20px" color="inherit" />,
  },
];
