import Layout from 'layouts/routerOutlet';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const AdminLayout = lazy(() => import('../layouts/admin'));

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: '/admin/*', element: <AdminLayout /> },
      { path: '/*', element: <Navigate to="/admin/default" replace /> },
    ],
  };
}
