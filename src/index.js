import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Mengaktifkan React Strict Mode
  <React.StrictMode>
    {/* Menyediakan Redux Store untuk seluruh aplikasi */}
    <Provider store={store}>
      {/* Mengaktifkan React Router untuk navigasi */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
