import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient, Provider } from 'urql';
import { getToken } from './token';

const client = createClient({
  url: 'http://127.0.0.1:8000/graphql/',
  fetchOptions: () => {
    const token = getToken();
    return {
        mode: "cors",
        credentials: 'same-origin',
        contentType: 'application/json',
        headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
