import '../styles/globals.css'
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://hasura-ditti.herokuapp.com/v1/graphql',
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret':'123456'
    },
  },
});


function MyApp({ Component, pageProps }) {
 
  return  <Provider value={client}> <Component {...pageProps} />  </Provider>
 
}

export default MyApp
