import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import PageLoader from 'components/pageLoader';
import { logout, updateUser } from './redux/actions/auth.js';
import axiosInstance from 'services/axiosInstance';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);
  const { user: userState, tokens } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(!!userState);

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // If the response status is 401, perform logout
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/users/${userState?.id}`, {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        });
        const { user, seller } = response.data;
        dispatch(updateUser({ user, seller }));
      } catch (error) {
        // Handle error
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userState) fetchUser();
  }, [dispatch, userState?.id]);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        {!isLoading && (
          <Routes>
            {isAuthenticated
              ? privateRoutes.map((route, index) => <Route key={index} exact {...route} />)
              : publicRoutes.map((route, index) => <Route key={index} exact {...route} />)}
          </Routes>
        )}
      </Suspense>
    </Router>
  );
};

export default App;
