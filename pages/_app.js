import "../styles/globals.css";
import { createClient, Provider } from "urql";
import { AuthProvider } from "../lib/auth.context";

const client = createClient({
  url: "https://hasura-ditti.herokuapp.com/v1/graphql",
  fetchOptions: {
    headers: {
      "content-type": "application/json",
      // "x-hasura-admin-secret": "123456",
    },
  },
});

// our authprovider is inside the urql provider because
// our context is consuming the urql context 
// and only a child can consume a parent context
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
