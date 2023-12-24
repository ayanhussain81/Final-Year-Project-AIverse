import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.js';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            {/* <BrowserRouter>
              <Routes>
                <Route path={`/auth/*`} element={<AuthLayout />} />
                <Route path={`/admin/*`} element={<AdminLayout />} />
                <Route path={`/rtl/*`} element={<RtlLayout />} />
                <Route path="/*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </BrowserRouter> */}
            <App />
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
