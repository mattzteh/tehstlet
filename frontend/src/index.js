import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store/store';
import jwtFetch from './store/jwt';

let store = configureStore({});
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.jwtFetch = jwtFetch;
}

const Root = () => {
  return (
  	<Provider store={store}>
      <Router>
        <App />
      </Router>
	  </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
