"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });


    const data = await res.json();


    if (!res.ok) {
      setError(data.message);
      return;
    }


    router.push("/login");
  }


  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-[#eef6ff]"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl space-y-5"
      >

        <h1 className="text-3xl font-bold text-center text-primary-ink">
          ساخت حساب کاربری
        </h1>


        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />


        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />


        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />


        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}


        <button
          className="w-full bg-primary py-3 rounded-xl text-primary-ink font-semibold hover:bg-primary-light transition"
        >
          ثبت نام
        </button>

      </form>
    </main>
  );
}