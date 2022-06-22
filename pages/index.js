import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery } from "urql";



export default function Home() {
  const [{ data, fetching, error }] = useQuery({
    query: ` query {
      books {
        author
        id
        user {
          name
        }
      }
    }`,
  });



  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
 console.log(data)
  return (
    <h1> Hi </h1>
    // <div>
    
    //   {JSON.stringify({data}, null, 2)}
    // </div>
  );
}
