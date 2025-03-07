import React from 'react';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from 'views/Home';
import Pricing from 'views/Pricing';
import Models from 'views/Models';
import Seller from 'views/seller';
import ModelDetails from 'views/Models/details';
import VerificationPage from 'views/VerifyEmail';
import Profile from 'views/profile';
const AdminLayout = lazy(() => import('../layouts/admin'));
const SellerLayout = lazy(() => import('../layouts/seller'));
const UserLayout = lazy(() => import('../layouts/user'));

const privateRoutes = [
  { path: '/admin/*', element: <AdminLayout /> },
  { path: '/', element: <Home /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/profile', element: <Profile /> },
  { path: '/marketplace', element: <Models /> },
  { path: '/model/detail/:name', element: <ModelDetails /> },
  { path: '/seller/*', element: <SellerLayout /> },
  { path: '/user/*', element: <UserLayout /> },
  { path: '/verify-email', element: <VerificationPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];

export default privateRoutes;
