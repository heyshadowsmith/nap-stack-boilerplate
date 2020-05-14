import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

let uri = 'http://localhost:4000'

if (process.env.NODE_ENV === 'production') {
  uri = '/api'
}

export default () => ({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors)
      console.log(networkError)
    }),
    new HttpLink({
      uri
    })
  ]),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
  connectDevTools: true
})
