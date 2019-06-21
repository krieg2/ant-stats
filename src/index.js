import React from 'react';
import ReactDOM from 'react-dom';
import StatsPage from './pages/StatsPage';
import calculations from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://antserver-blocjgjbpw.now.sh/graphql' }),
  cache: new InMemoryCache(),
});

const store = createStore(
  calculations,
  {}, // initial state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<ApolloProvider client={client}>
	  <Provider store={store}>
	    <StatsPage />
	  </Provider>
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
