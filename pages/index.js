import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const signup = async (email, password) => {
  const data = {
    email,
    password,
  };

  const JSONdata = JSON.stringify(data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch("/api/users", options);
  const result = await response.json();
  localStorage.setItem("token", result.token);
  console.log(result);
  
};

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signup(email, password);
    router.push("/dashboard");
  }

  return (
    <>
      <div style={{ padding: 300 }}>
        <form>
          <fieldset>
            <legend>SignUp</legend>
            <label>
              Email Address: <input type="email" required name="email" ref={emailRef} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" required name="password" ref={passwordRef} />
            </label>
            <br />
            <small style={{ marginTop: 20 }}>
              <Link href="/login">Already Registered?</Link>
            </small>
            <br />
            <input
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
              type="submit"
              value="SignUp"
            ></input>
          </fieldset>
        </form>
      </div>
    </>
  );
}
