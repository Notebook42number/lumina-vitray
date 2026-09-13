"use client"

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "lucide-react";

export default function Input(){
    const [search,setSearch]=useState("");
    const searchParams =useSearchParams();
    const router=useRouter();


return (
  <div className="flex justify-center pt-4">
    <input
      className="glass-primary w-[700px] h-[60px] rounded-xl px-4 text-white placeholder:text-neutral-400 outline-none"
      placeholder="جستجو در محصولات"
      type="text"
      value={search}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        router.push(`/?${params.toString()}`);
      }}
    />
  </div>
);
}