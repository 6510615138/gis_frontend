"use client"

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Call your login API here
    console.log('Logging in with', email, password);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white px-10 py-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
                    src="/logo.png"
                    width={130}
                    height={70}
                    sizes="5%"
                    style={{ width: 'auto', height: '100%', padding:"1%"}}
                    alt="TCCT"/>
          <h2 className="text-xl font-medium mb-2"></h2>
          <p className="text-sm text-gray-500 mb-6"></p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email or phone"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-sm text-blue-600 text-center hover:underline cursor-pointer">
          Forgot password?
        </div>
      </div>
    </div>
  );
}
