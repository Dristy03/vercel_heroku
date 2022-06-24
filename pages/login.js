import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const login = async (email, password) => {
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

  const response = await fetch("/api/users/login", options);
  const result = await response.json();
  localStorage.setItem("token", result.token);
  console.log(result);
};

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await login(email, password);
   
    router.push("/dashboard");
  }


  return (
 
<>
<div style={{padding:300}}>
<form>
    <fieldset>
        <legend>Login</legend>
        <label>Email Address: <input type="email"  required ref={emailRef} name="email"/></label>
        <br/>
        <label >Password: <input type="password" required ref={passwordRef} name="password"/></label>
        <br/>
        <small style={{marginTop: 20}}> 
       <Link href="/">
         Not Registered Yet?
       </Link>
       </small>
       <br/>
        <input style={{marginTop: 20}} onClick={handleSubmit} type="submit" value="Login"></input>
    </fieldset>
 
</form>
</div>
    </>
  
  );
}
