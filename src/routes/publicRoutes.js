import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/auth';
import Layout from 'layouts/routerOutlet';
import Home from 'views/Home';
import Models from 'views/Models';
import ModelDetails from 'views/Models/details';
import Pricing from 'views/Pricing';
import VerificationPage from 'views/VerifyEmail';

const publicRoutes = [
  { path: '/auth/*', element: <AuthLayout /> },
  { path: '/', element: <Home /> },
  { path: '/model/detail/:name', element: <ModelDetails /> },
  { path: '/marketplace', element: <Models /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/verify-email', element: <VerificationPage /> },
  { path: '/*', element: <Navigate to="/auth/sign-in" replace /> },
];

export default publicRoutes;
