import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth.context";


export default function Dashboard() {
  const { clearToken } = useAuth();
  const router = useRouter();

  function logout()
  {
    clearToken();
    router.push('/')
  }

  const [{ data, fetching, error }] = useQuery({
    query: ` query {
      users {
        id 
      }
    }`
  });

  if (fetching) return <p>Loading...</p>;
  console.log(data);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Hi There! You made it!</h1>
      {error && <p>Oh no... {error.message}</p>}
      {data && JSON.stringify(data)}
      <button onClick={logout} style={{backgroundColor: "black", color: "white", margin: 50, padding: 10}}>Logout</button>
    </>
  );
}
