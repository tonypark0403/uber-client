import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, Operation, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';
import config from './config';

const getToken = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return token;
  } else {
    return '';
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      jwt: getToken(),
    },
  });
  return forward(operation);
});

// tslint:disable-next-line:no-console
console.log('endpoint', process.env.REACT_APP_GRAPHQL_ENDPOINT);
// tslint:disable-next-line:no-console
console.log('ws:', `http://${config.SERVER}${config.GRAPHQL.GRAPHQL_ENDPOINT}`);
const httpLink = new HttpLink({
  uri: `https://${config.SERVER}${config.GRAPHQL.GRAPHQL_ENDPOINT}`,
});

const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      jwt: getToken(),
    },
    reconnect: true,
  },
  uri: `${protocol}://${config.SERVER}${config.SUBSCRIPTION.SUBSCRIPTION_ENDPOINT}`,
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: 'Auth',
      isLoggedIn: Boolean(localStorage.getItem('jwt')),
    },
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem('jwt', token);
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: true,
            },
          },
        });
        return null;
      },
      logUserOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem('jwt');
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: false,
            },
          },
        });
        return null;
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks),
  ]),
});

export default client;
