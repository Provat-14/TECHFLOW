// app/login/page.tsx
"use client"

import { loginUser } from "@/actions/auth-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");
    const result = await loginUser(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); 
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form action={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
          <input name="password" type="password" placeholder="Password" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}