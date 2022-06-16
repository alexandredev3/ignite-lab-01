import { GetServerSidePropsContext, NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export type ApolloClientContext = GetServerSidePropsContext;

const SCHEMA = process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA;

export const withPublicApollo = (Component: NextPage) => {
  const Provider = (props: any) => {
    // this props come from the getServerSideProps function.
    // in getServerSideProps we going to return the apolloState.
    // apolloState is our server side cache.

    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component />
      </ApolloProvider>
    );
  };

  return Provider;
};

/**
 *
 * @param ctx       we can alter the request(interceptors, alter headers, etc..) eventually.
 * @param ssrCache  the server side cache, so we can sharing the client-side cache with the server-side cache.
 * @returns
 */
export const getApolloClient = (
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) => {
  const cache = new InMemoryCache().restore(ssrCache ?? {}); // we can use otheres cache strategies.

  const httpLink = createHttpLink({
    uri: SCHEMA,
    fetch, // we're saying to use the browser api fetch, we can use axios, request, undici, etc...
  });

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
};
