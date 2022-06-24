import { createClient } from '@urql/core';

const client = createClient({
  url: 'https://hasura-ditti.herokuapp.com/v1/graphql',
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret':'123456'
    },
  },
});


export default client