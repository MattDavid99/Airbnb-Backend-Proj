// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';
import configureStore from './store';
import * as sessionActions from './store/session';

const store = configureStore();

// if (process.env.NODE_ENV !== 'production') {
//   window.store = store;
// }


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}



function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
