import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken"; creates webpack errors, install jwt-decode instead

const Dashboard = () => {
  async function populateDashboard() {
    const req = await fetch("http://localhost:1337/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = req.json()
    console.log(data)
  }
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/");
      } else {
        populateDashboard();
      }
    }
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-3xl">Dashboard</h1>
      {/* <h1 className="text-2xl">Hello, {user.name} </h1> */}
    </div>
  );
};

export default Dashboard;
