// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // اتصال استاندارد شده به دیتابیس
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // ۱. تنظیم سشن روی حالت JWT (JSON Web Token)
  session: {
    strategy: "jwt",
  },
  
  // ۲. تعریف روش لاگین (ایمیل و پسورد)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // الف. چک کردن اینکه کاربر حتماً ایمیل و پسورد را وارد کرده باشد
        if (!credentials?.email || !credentials?.password) {
          throw new Error("لطفاً ایمیل و رمز عبور خود را وارد کنید");
        }

        // ب. پیدا کردن کاربر در دیتابیس بر اساس ایمیل (با توجه به حروف کوچک مدلت در اسکیما)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // ج. اگر کاربر وجود نداشت
        if (!user) {
          throw new Error("کاربری با این ایمیل یافت نشد");
        }

        // د. مقایسه پسورد وارد شده با پسورد هش‌شده در دیتابیس به کمک bcrypt
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("رمز عبور اشتباه است");
        }

        // ه‍. اگر همه چیز درست بود، اطلاعات کاربر را برگردان
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // فرستادن نقش کاربر برای استفاده در توکن
        };
      },
    }),
  ],

  // ۳. انتقال دادن مقدار role به توکن و سشن نکست‌ات (بسیار حیاتی برای پنل ادمین)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  
  // ۴. آدرس صفحات سفارشی (اگر کاربر لاگین نبود، به این مسیر هدایت شود)
  pages: {
    signIn: "/login",
  },
  
  // ۵. کلید رمزگذاری توکن‌ها
  secret: process.env.NEXTAUTH_SECRET,
};

// خروجی استاندارد برای App Router در Next.js که ریکوئست‌های GET و POST لاگین را هندل می‌کند
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };