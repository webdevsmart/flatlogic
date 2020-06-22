import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import App from './components/App';
import config from './config';
import reducers from './reducers';

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('id_token');
console.log("token:", token);

if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

const uploadLink = createUploadLink({ 
  uri: config.api_url,
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  console.log("context token: ", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // uri: config.api_url,
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache()
  // request: (operation) => {
  //   // const token = localStorage.getItem('token');
  //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMyNWM2YjI5LTE4NjMtNGM2ZC1iNWQwLTFmOTc4NTAyOTEyMCIsInVzZXJfaWQiOiJmYjU0ZmQ3ZS1iMGYwLTQwMWItOWIyNS01MWFkMTdmYTJkZjgiLCJpYXQiOjE1OTI3NDIxOTYsImV4cCI6MTU5MzM0Njk5Nn0.6_K5WK2pi1Div3egBudMssHawpMJuXMDTbG05dWsgo4";
    
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   });
  // }
});

console.log("SERVER URL:", config.api_url);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
