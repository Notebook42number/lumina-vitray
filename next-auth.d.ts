import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // 👈 معرفی نقش به سشن
    };
  }

  interface User {
    id: string;
    role: string; // 👈 معرفی نقش به یوزر
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // 👈 معرفی نقش به توکن
  }
}