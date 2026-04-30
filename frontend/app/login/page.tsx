"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://college-platform-j7qn.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});

    const data = await res.json();
    alert(data.success ? "Login Success" : "Invalid Credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* CARD */}
      <div className="bg-white/10 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>

        {/* FOOTER */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account? <span className="text-blue-400 cursor-pointer">Sign up</span>
        </p>

      </div>
    </div>
  );
}
