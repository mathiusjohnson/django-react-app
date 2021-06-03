import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
