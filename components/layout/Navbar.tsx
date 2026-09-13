
"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import FloatingHorizontal from "../motions/FloatingHorizontal";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fixed left-1/2 top-3 z-50 w-[94%] max-w-7xl -translate-x-1/2 font-vazirmatn md:top-4 md:w-[95%]"
      dir="rtl"
    >
      <div className="rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg backdrop-blur-xl sm:p-4 sm:px-6 md:px-8">

        {/* Main Navbar */}
        <div className="flex items-center justify-between gap-3">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-neutral-200 transition hover:bg-white/10 md:hidden"
            aria-label="منو"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-4 text-sm text-neutral-200 lg:gap-6 md:flex">
            <Link
              href="/shop"
              className="transition hover:text-primary"
            >
              فروشگاه
            </Link>

            <Link
              href="/gallery"
              className="transition hover:text-primary"
            >
              گالری
            </Link>

            <Link
              href="/orders"
              className="transition hover:text-primary"
            >
              سفارشات
            </Link>

            <Link
              href="/aboutus"
              className="transition hover:text-primary"
            >
              درباره ما
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-primary"
            >
              تماس با ما
            </Link>
          </div>

          {/* Strawberry */}
          <div className="hidden pointer-events-none sm:block">
            <FloatingHorizontal intensity={120}>
              <Image
                src="/images/strawberry.png"
                alt="icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </FloatingHorizontal>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-neutral-200 transition hover:bg-white/5 hover:text-primary sm:h-10 sm:w-10"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="h-5 w-5" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-ink">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="hidden h-5 w-px bg-white/15 sm:block" />

            {/* Auth */}
            {status === "loading" ? (
              <span className="hidden text-xs text-neutral-400 sm:block">
                در حال بررسی...
              </span>
            ) : session ? (
              <div className="hidden items-center gap-2 sm:flex md:gap-3">

                <span className="max-w-[140px] truncate text-xs font-medium text-neutral-100 md:text-sm">
                  سلام، {session.user?.name || "کاربر"} ✨
                </span>

                <Link
                  href="/profile"
                  className="text-xs text-neutral-300 transition hover:text-primary"
                >
                  پروفایل
                </Link>

                <button
                  onClick={() =>
                    signOut({ callbackUrl: "/" })
                  }
                  className="rounded-xl bg-white/10 px-3 py-1.5 text-xs text-neutral-100 transition hover:bg-white/15"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="text-xs text-neutral-200 transition hover:text-primary sm:text-sm"
                >
                  وارد شوید
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-ink shadow-md transition hover:bg-primary-light sm:px-4 sm:text-sm"
                >
                  عضویت
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 md:hidden">

            <div className="flex flex-col gap-1">

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5 hover:text-primary"
              >
                فروشگاه
              </Link>

              <Link
                href="/gallery"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5 hover:text-primary"
              >
                گالری
              </Link>

              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5 hover:text-primary"
              >
                سفارشات
              </Link>

              <Link
                href="/aboutus"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5 hover:text-primary"
              >
                درباره ما
              </Link>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5 hover:text-primary"
              >
                تماس با ما
              </Link>

              <div className="my-2 h-px bg-white/10" />

              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5"
                  >
                    پروفایل
                  </Link>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="rounded-xl px-4 py-3 text-right text-sm text-red-300 transition hover:bg-white/5"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-neutral-200 transition hover:bg-white/5"
                  >
                    ورود
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-ink transition hover:bg-primary-light"
                  >
                    عضویت
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

