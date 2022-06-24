import { useQuery } from "urql";
import { useRouter } from "next/router";


export default function Dashboard() {
  const router = useRouter();

  function logout()
  {
    localStorage.removeItem("token");
    router.push('/')
  }

  const [{ data, fetching, error }] = useQuery({
    query: ` query {
      books {
        author
        id
        user {
          email
        }
      }
    }`
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log(data);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Hi There! You've made it!</h1>

      <button onClick={logout} style={{backgroundColor: "black", color: "white", margin: 50, padding: 10}}>Logout</button>
    </>
  );
}
