import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      alert(message);
    });
  }
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GQL_URL });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});
