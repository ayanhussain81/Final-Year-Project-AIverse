import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from './routes/privateRoutes.js';
import PublicRoutes from './routes/publicRoutes.js';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);
  const router = createBrowserRouter([isAuthenticated ? PrivateRoutes() : PublicRoutes()]);
  return <RouterProvider router={router} />;
};

export default App;
