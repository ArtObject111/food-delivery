import React           from 'react';
import ReactDOM        from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HashRouter }  from 'react-router-dom';
import { Provider }    from 'react-redux';
import                 './firebase'

import                 './index.css';
import App             from './App';
import store           from './redux/redux-store';
import { getAuthUserDataTC, signInUserTC, signOutUserTC, signUpUserTC } from './redux/auth-reducer';

// store.dispatch(signUpUserTC("abcyo@mail.ru", "Sunday24"))
// store.dispatch(signInUserTC("abcyo@mail.ru", "Sunday24"))
// store.dispatch(signInUserTC("automotors24@mail.ru", "Sunday24"))
// store.dispatch(signOutUserTC())
// store.dispatch(getAuthUserDataTC())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
