import React from "react";
import { useState } from "react";
import App from "../../App";
import { registerUser } from "../../api/users";
import useAuth from "../../../hooks/useAuth";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, user } = useAuth();
  console.log("User from Sign up form:", user);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await registerUser(username, password);
      setToken(result.data.token);
      console.log("result in component", result);
      localStorage.getItem("token", result.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}