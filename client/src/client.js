import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'

/**
 * Create a new apollo client and export as default
 */
//
//https://rickandmortyapi.com/graphql
/*
const query = gql`
  {
    characters {
      results {
        name
      }
    }
  }
`;

client.query({query}).then(curr => console.log(curr))

*/
//helper middlewares from apollo to incur a delay in response
const delay = setContext( req => new Promise((success, fail) => {
  setTimeout(() => {
    success()
  }, 8000)
})) 

//network interface from appolo
 const http = new HttpLink({
   uri: "http://localhost:4000/",
 });

 const link = ApolloLink.from([
   delay, http
 ])
 const cache = new InMemoryCache()

 const client = new ApolloClient({link, cache})

 export default client
