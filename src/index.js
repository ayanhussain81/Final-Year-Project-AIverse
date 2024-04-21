import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.js';
import './index.css';
import { HeaderProvider } from 'contexts/HeaderContext';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <HeaderProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </HeaderProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
