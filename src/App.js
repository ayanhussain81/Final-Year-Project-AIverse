import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import PageLoader from 'components/pageLoader';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);

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
