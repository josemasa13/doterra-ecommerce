import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom'
import config from './auth_config.json';


ReactDOM.render(
  <Auth0Provider
      domain="doterrawebsite.us.auth0.com"
      clientId="mtBEL8wmgbCirjgaTth60yceRDVDpqkY"
      redirectUri="http://localhost:3000/productos">      
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
