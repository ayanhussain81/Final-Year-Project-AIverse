import React from 'react';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from 'views/Home';
import Pricing from 'views/Pricing';
import Models from 'views/Models';
import Seller from 'views/seller';
import ModelDetails from 'views/Models/details';
import VerificationPage from 'views/VerifyEmail';
import SellerDashboard from 'views/seller/dashboard';
const AdminLayout = lazy(() => import('../layouts/admin'));

const privateRoutes = [
  { path: '/admin/*', element: <AdminLayout /> },
  { path: '/', element: <Home /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/marketplace', element: <Models /> },
  { path: '/model/detail/:name', element: <ModelDetails /> },
  { path: '/seller', element: <Seller /> },
  { path: '/seller/dashboard', element: <SellerDashboard /> },
  { path: '/verify-email', element: <VerificationPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];

export default privateRoutes;
