// app/register/page.tsx
"use client"

import { registerUser } from "@/actions/auth-actions";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setMessage(null);
    
    const result = await registerUser(formData);
    
    setLoading(false);
    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: "Account created! Now you can login." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative z-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Create Account</h2>
        <p className="text-gray-400 text-center text-sm mb-8">Join TechFlow and start ordering services.</p>
        
        {message && (
          <div className={`p-4 mb-6 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ml-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 ml-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}