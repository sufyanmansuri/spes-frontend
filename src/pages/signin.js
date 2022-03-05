import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
    async function loginUser(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:1337/api/login", {
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
        if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
      }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account{" "}
          <span role="img" aria-label="lock-with-key">
            🔐
          </span>
        </h1>

        <form onSubmit={loginUser}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-500 hover:outline-none hover:border-green-800`}
            >
              Continue with email
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-500">
                Click here.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
