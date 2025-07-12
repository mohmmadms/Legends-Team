'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-[#065F46] text-center">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-[#D97706] text-white py-3 rounded-lg hover:bg-[#b66205]">
          Sign In
        </button>
      </form>
    </div>
  );
}
