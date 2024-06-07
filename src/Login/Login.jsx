import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { user, errorMessage, handleLogin } = useAuth();

  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center w-4/5">
      <div className="max-w-md w-full bg-white  p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-400"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:bg-red-700"
          onClick={() => handleLogin(email, password)} // Pass email and password to handleLogin
        >
          Login
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
