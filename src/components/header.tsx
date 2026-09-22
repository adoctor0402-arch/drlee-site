"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";
import { BookingButton, useBooking } from "./booking";
import { Logo } from "./logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow] duration-500 ${
        scrolled || menu ? "bg-ivory/90 shadow-[0_1px_0_rgba(23,54,93,0.08)] backdrop-blur-md" : "bg-ivory"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-10">
        {/* Mobile: ☰ */}
        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-label={menu ? "關閉選單" : "開啟選單"}
          aria-expanded={menu}
          className="grid h-10 w-10 place-items-center rounded-full text-deep lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${menu ? "top-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition ${menu ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-px w-5 bg-current transition ${menu ? "top-1.5 -rotate-45" : ""}`} />
          </span>
        </button>

        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} 首頁`} onClick={() => setMenu(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="主要導覽">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] text-ink/80 transition-colors hover:text-deep">
              {n.label}
            </Link>
          ))}
          <BookingButton size="sm" />
        </nav>

        {/* Mobile: [預約] */}
        <button
          type="button"
          onClick={open}
          className="rounded-full bg-deep px-4 py-2 text-sm font-medium text-ivory lg:hidden"
        >
          預約
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 bg-ivory px-6 pt-6 transition-[opacity,visibility] duration-300 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="行動版導覽">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              className="border-b border-deep/10 py-4 font-serif text-xl text-deep"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8" onClick={() => setMenu(false)}>
          <BookingButton className="w-full" />
        </div>
      </div>
    </header>
  );
}
