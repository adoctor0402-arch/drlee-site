import Link from "next/link";
import { BookingButton } from "./booking";
import { buttonClass } from "./button-class";
import { PrinceOnPlanet } from "./prince";

// V1 尚未完成的頁面先用這個，避免連結 404
export function ComingSoon({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <div className="w-32">
        <PrinceOnPlanet />
      </div>
      <p className="mt-6 font-display text-sm italic tracking-[0.2em] text-gold">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-deep sm:text-4xl">{title}</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">{note ?? "這一頁正在整理中，很快就會跟你見面。"}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("ghost")}>
          回到首頁
        </Link>
        <BookingButton />
      </div>
    </section>
  );
}
