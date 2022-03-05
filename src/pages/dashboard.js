import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");

  async function populateQuote() {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setName(data.name);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/");
      } else {
        populateQuote();
      }
    }
  });

  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:1337/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: tempName,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setName(tempName);
      setTempName("");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder drop-shadow py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 text-center">
          Dashboard
          <span role="img" aria-label="profile">
            🔐
          </span>
        </h1>
        <h1 className="text-xl font-medium text-primary mt-2 mb-12 text-center">
          Hello, {name || "no user found"}{" "}
        </h1>
        <form onSubmit={updateQuote}>
          <div>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              name="name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Change your name"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-500 hover:outline-none hover:border-green-800`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
