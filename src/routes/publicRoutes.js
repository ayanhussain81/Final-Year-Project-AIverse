import { Navigate, Route } from 'react-router-dom';
import AuthLayout from '../layouts/auth';
import Layout from 'layouts/routerOutlet';

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      { path: '/auth/*', element: <AuthLayout /> },
      { path: '/*', element: <Navigate to="/auth/sign-in" replace /> },
    ],
  };
}
