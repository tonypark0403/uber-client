import ApolloClient, { Operation } from 'apollo-boost';
import config from './config';

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: Boolean(localStorage.getItem(config.AUTH.TOKEN_COOKIE)),
      },
    },
    resolvers: {
      Mutation: {
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem(config.AUTH.TOKEN_COOKIE, token);
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggedIn: true,
              },
            },
          });
          return null;
        },
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem(config.AUTH.TOKEN_COOKIE);
          cache.writeData({
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
  },
  request: async (operation: Operation) => {
    // console.log('client operation:', operation.getContext());
    operation.setContext({
      headers: {
        [config.AUTH.TOKEN_COOKIE]:
          localStorage.getItem(config.AUTH.TOKEN_COOKIE) || '',
      },
    });
  },
  uri: `http://localhost:4000${config.GRAPHQL.GRAPHQL_ENDPOINT}`,
}); // my graphql endpoint

export default client;
