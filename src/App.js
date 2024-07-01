import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import PageLoader from 'components/pageLoader';
import { logout, updateUser } from './redux/actions/auth.js';
import axiosInstance from 'services/axiosInstance';
import Toast from 'shared/toast';

const AxiosInterceptor = ({ children }) => {
  const location = useLocation();
  const toastRef = useRef(null);

  useEffect(() => {
    const errorHandler = (error) => {
      if (!window.location.pathname.startsWith('/auth')) {
        toastRef.current.showErrorToast(error?.response?.data?.message || error?.message);
      }
      return Promise.reject(error);
    };

    const interceptor = axiosInstance.interceptors.response.use((response) => response, errorHandler);

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [window.location.pathname]);

  return (
    <>
      <Toast ref={toastRef} />
      {children}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);
  const { user: userState, tokens } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(!!userState);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
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
        <AxiosInterceptor>
          {!isLoading && (
            <Routes>
              {isAuthenticated
                ? privateRoutes.map((route, index) => <Route key={index} exact {...route} />)
                : publicRoutes.map((route, index) => <Route key={index} exact {...route} />)}
            </Routes>
          )}
        </AxiosInterceptor>
      </Suspense>
    </Router>
  );
};

export default App;
