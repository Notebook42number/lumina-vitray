// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // اینجا می‌تونی منطق پیچیده‌تر بنویسی
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // اگر به مسیر داشبورد یا ادمین رفت:
        if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin"))
       {
          return !!token; // فقط اگر لاگین کرده باشه اجازه بده
        }
        return true; // بقیه صفحات آزاد باشن
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // فقط این مسیرها چک بشن
};