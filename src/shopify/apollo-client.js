import "./fetch-polyfill";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // credentials: 'include',
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    Accept: "application/json",
  },
  uri,
});

export default client;
