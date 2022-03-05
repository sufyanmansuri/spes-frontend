import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    if(data.status === 'ok'){
        history('/signin')
    }
  }

  return (
    <div>
      <h1>Create an account 🔒</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />{" "}
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />{" "}
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />{" "}
        <br />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default Signup;
