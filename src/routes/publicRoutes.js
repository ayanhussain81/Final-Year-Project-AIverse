import { Navigate, Route } from 'react-router-dom';
import AuthLayout from '../layouts/auth';
import Layout from 'layouts/routerOutlet';
import Home from 'views/Home';
import Models from 'views/Models';

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      { path: '/auth/*', element: <AuthLayout /> },
      { path: '/', element: <Home /> },
      { path: '/models', element: <Models /> },
      { path: '/*', element: <Navigate to="/auth/sign-in" replace /> },
    ],
  };
}
