"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { branches, doctorPage, hospitalLinks, type Branch } from "@/config/site";
import { buttonClass, type ButtonVariant, type ButtonSize } from "./button-class";

type BookingCtx = { open: () => void };
const Ctx = createContext<BookingCtx>({ open: () => {} });

const STORAGE_KEY = "drlee.branch";

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [lastBranch, setLastBranch] = useState<Branch["id"] | null>(null);
  const open = useCallback(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "taichung" || v === "banqiao") setLastBranch(v);
    } catch {}
    setOpen(true);
  }, []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <BookingSheet isOpen={isOpen} onClose={() => setOpen(false)} lastBranch={lastBranch} setLastBranch={setLastBranch} />
    </Ctx.Provider>
  );
}

export function useBooking() {
  return useContext(Ctx);
}

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function BookingButton({ children = "預約門診", variant = "primary", size = "md", className = "" }: ButtonProps) {
  const { open } = useBooking();
  return (
    <button type="button" onClick={open} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  );
}

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  lastBranch: Branch["id"] | null;
  setLastBranch: (id: Branch["id"]) => void;
};

function BookingSheet({ isOpen, onClose, lastBranch, setLastBranch }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const choose = (b: Branch) => {
    try {
      localStorage.setItem(STORAGE_KEY, b.id);
    } catch {}
    setLastBranch(b.id);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="booking-title"
      className="m-0 mt-auto w-full max-w-none rounded-t-3xl bg-ivory p-0 text-ink backdrop:bg-deep-2/50 backdrop:backdrop-blur-sm open:animate-fade-up sm:m-auto sm:max-w-lg sm:rounded-3xl"
    >
      <div className="relative px-6 pb-8 pt-7 sm:px-9 sm:pt-9">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-deep/15 sm:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-mist/60 hover:text-deep"
        >
          ✕
        </button>

        <p className="font-display text-sm italic tracking-[0.2em] text-gold">Book a Visit</p>
        <h2 id="booking-title" className="mt-1 font-serif text-2xl font-semibold text-deep">
          你想在哪裡看診？
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          李俊逸醫師在台中總院與板橋分院都有門診。掛號會開啟茂盛醫院官方頁面。
        </p>

        <a
          href={doctorPage}
          target="_blank"
          rel="noopener"
          className="group mt-6 flex items-center justify-between rounded-2xl bg-deep px-5 py-4 text-ivory transition-colors hover:bg-deep-2"
        >
          <span>
            <span className="block font-serif text-lg font-semibold">李俊逸醫師 門診表與掛號</span>
            <span className="mt-0.5 block text-sm text-ivory/70">兩個院區的門診時段都在這一頁</span>
          </span>
          <span className="text-xl text-sun transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">或直接到院區掛號系統</p>

        <div className="mt-3 grid gap-3">
          {branches.map((b) => (
            <a
              key={b.id}
              href={b.bookingUrl}
              target="_blank"
              rel="noopener"
              onClick={() => choose(b)}
              className={`group flex items-center justify-between rounded-2xl border bg-white px-5 py-4 transition-colors hover:border-gold ${
                lastBranch === b.id ? "border-gold/70" : "border-deep/10"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-semibold text-deep">{b.name}</span>
                  {lastBranch === b.id && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs text-[#8a6a2c]">上次選擇</span>
                  )}
                </div>
                <div className="mt-0.5 text-sm text-muted">{b.area}・線上掛號</div>
              </div>
              <span className="text-xl text-gold transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 space-y-1.5 border-t border-deep/10 pt-5 text-sm text-muted">
          <p>
            電話掛號：
            {branches.map((b, i) => (
              <span key={b.id}>
                {i > 0 && "｜"}
                {b.name.slice(0, 2)}{" "}
                <a href={b.phoneHref} className="text-deep underline-offset-4 hover:underline">
                  {b.phone}
                </a>
              </span>
            ))}
          </p>
          <p>
            <a href={hospitalLinks.schedule} target="_blank" rel="noopener" className="text-deep underline-offset-4 hover:underline">
              全院門診時段表 ↗
            </a>
          </p>
        </div>
      </div>
    </dialog>
  );
}
