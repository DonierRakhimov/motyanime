import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/fonts.css';
import './index.css';
import './assets/normalize.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setInterceptor } from './utils/axiosOptions';

setInterceptor(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
