import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.tokens !== null);

  return (
    <Router>
      <Routes>
        {isAuthenticated
          ? privateRoutes.map((route, index) => <Route key={index} exact {...route} />)
          : publicRoutes.map((route, index) => <Route key={index} exact {...route} />)}
      </Routes>
    </Router>
  );
};

export default App;
