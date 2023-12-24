import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RtlLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Routes>
                <Route path={`/auth/*`} element={<AuthLayout />} />
                <Route path={`/admin/*`} element={<AdminLayout />} />
                <Route path={`/rtl/*`} element={<RtlLayout />} />
                <Route path="/" element={<Navigate to="/admin" replace />} />
              </Routes>
            </BrowserRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
