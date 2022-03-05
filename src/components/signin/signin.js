import React, { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if(data.user){
        localStorage.setItem('token', data.user)
        alert('Login Success')
        window.location.href = "/dashboard"
    }
    else{
        alert("Error")
    }
    console.log(data);
  }

  return (
    <div>
      <h1>Login to your account 🔒</h1>
      <form onSubmit={registerUser}>
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
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Signin;
