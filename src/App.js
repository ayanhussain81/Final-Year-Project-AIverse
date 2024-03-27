import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import PageLoader from 'components/pageLoader';
import { updateUser } from './redux/actions/auth.js';
import axiosInstance from 'services/axiosInstance';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);
  const { user: userState, tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('hello');
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
      }
    };

    if (userState) fetchUser();
  }, [dispatch, userState?.id]);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {isAuthenticated
            ? privateRoutes.map((route, index) => <Route key={index} exact {...route} />)
            : publicRoutes.map((route, index) => <Route key={index} exact {...route} />)}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
