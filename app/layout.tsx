import { Katibeh } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast"
const katibeh = Katibeh({
  weight: ["400"],
  subsets: ["arabic", "latin"],
  variable: "--font-katibeh",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={katibeh.variable}>
        <Toaster position="top-center" />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
} 